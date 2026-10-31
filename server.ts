import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { Resend } from "resend";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Canonical domain redirect middleware (non-www to www)
  app.use((req, res, next) => {
    const host = req.headers.host;
    if (host && host.toLowerCase() === "theredcompany.co.in") {
      return res.redirect(301, `https://www.theredcompany.co.in${req.originalUrl}`);
    }
    next();
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Initialize Resend
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

  // API routes
  app.post("/api/contact", async (req, res) => {
    const { name, email, service, message, _hp } = req.body || {};

    // 1. Spam honeypot
    if (_hp) {
      return res.json({ success: true });
    }

    // 2. Validation
    const trimmedName = (name || "").trim();
    const trimmedEmail = (email || "").trim();
    const trimmedService = (service || "General Inquiry").trim();
    const trimmedMessage = (message || "").trim();

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return res.status(400).json({ error: "Missing required fields", details: "Name, email, and message are required." });
    }

    if (trimmedName.length > 120) {
      return res.status(400).json({ error: "Invalid input", details: "Name exceeds maximum length." });
    }

    if (trimmedEmail.length > 150 || !EMAIL_REGEX.test(trimmedEmail)) {
      return res.status(400).json({ error: "Invalid email", details: "Please provide a valid email address." });
    }

    if (trimmedMessage.length > 5000) {
      return res.status(400).json({ error: "Invalid input", details: "Message exceeds maximum length." });
    }

    const sanitize = (str: string) =>
      str.replace(/[&<>"']/g, (m) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[m] || m));

    const safeName = sanitize(trimmedName);
    const safeEmail = sanitize(trimmedEmail);
    const safeService = sanitize(trimmedService);
    const safeMessage = sanitize(trimmedMessage).replace(/\n/g, "<br />");

    try {
      if (resend) {
        const fromEmail = process.env.RESEND_FROM_EMAIL || "The RED Company <connect@theredcompany.co.in>";

        // 1. Send email to the business
        const businessEmail = await resend.emails.send({
          from: fromEmail,
          to: "connect@theredcompany.co.in",
          subject: `New Event Enquiry: ${trimmedService} from ${trimmedName}`,
          text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\nService: ${trimmedService}\n\nMessage:\n${trimmedMessage}`,
          replyTo: trimmedEmail,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0A0A0A; color: #FFFFFF; border-radius: 12px; border: 1px solid #222;">
              <h2 style="color: #E63946; text-transform: uppercase; margin-top: 0;">New Event Enquiry</h2>
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #E63946;">${safeEmail}</a></p>
              <p><strong>Service:</strong> ${safeService}</p>
              <div style="background: #141414; padding: 16px; border-radius: 8px; border-left: 3px solid #E63946; margin-top: 16px;">
                <p style="margin: 0;">${safeMessage}</p>
              </div>
            </div>
          `,
        });

        if (businessEmail.error) {
          console.error("Resend Business Email Error:", businessEmail.error);
          return res.status(500).json({ 
            error: "Failed to send inquiry email", 
            details: businessEmail.error.message 
          });
        }

        // 2. Send automated reply to the user
        try {
          await resend.emails.send({
            from: fromEmail,
            to: trimmedEmail,
            subject: "Thank you for reaching out to The RED Company",
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0A0A0A; color: #FFFFFF; border-radius: 12px; border: 1px solid #222;">
                <h2 style="color: #E63946; text-transform: uppercase; margin-top: 0;">Thank you, ${safeName}!</h2>
                <p>We've received your inquiry regarding <strong>${safeService}</strong>.</p>
                <p>Our team of expert event architects in Bangalore is already reviewing your details. One of our lead planners will contact you within the next 24 hours to discuss how we can bring your vision to life.</p>
                <hr style="border: none; border-top: 1px solid #222; margin: 20px 0;" />
                <p style="font-size: 12px; color: #888;">
                  <strong>The RED Company</strong><br />
                  Bangalore's Premier Event Architects<br />
                  Rajajinagar, Bangalore, India<br />
                  Phone: +91 82174 48031 / +91 79750 18465
                </p>
              </div>
            `,
          });
        } catch (userEmailErr) {
          console.warn("Resend User Email Warning:", userEmailErr);
        }

        res.json({ success: true, message: "Enquiry submitted successfully." });
      } else {
        console.warn("RESEND_API_KEY is not set. Email not sent.");
        res.status(500).json({ error: "Email service not configured. Please set RESEND_API_KEY." });
      }
    } catch (error: any) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email", details: error?.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));

    // Serve prerendered static HTML for clean canonical routes
    app.get(["/services", "/portfolio", "/about", "/contact"], (req, res, next) => {
      const cleanPath = req.path.replace(/^\//, "");
      const filePath = path.join(distPath, `${cleanPath}.html`);
      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      }
      next();
    });

    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

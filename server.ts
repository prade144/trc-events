import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Resend
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

  // API routes
  app.post("/api/contact", async (req, res) => {
    const { name, email, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      if (resend) {
        // 1. Send email to the business
        const businessEmail = await resend.emails.send({
          from: "The RED Company <onboarding@resend.dev>",
          to: "connect@theredcompany.co.in",
          subject: `New Inquiry: ${service || "General"} from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`,
          replyTo: email,
        });

        if (businessEmail.error) {
          console.error("Resend Business Email Error:", businessEmail.error);
          return res.status(500).json({ 
            error: "Failed to send inquiry email", 
            details: businessEmail.error.message 
          });
        }

        // 2. Send automated reply to the user
        const userEmail = await resend.emails.send({
          from: "The RED Company <onboarding@resend.dev>",
          to: email,
          subject: "Thank you for reaching out to The RED Company",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #FF0000; text-transform: uppercase;">Thank you, ${name}!</h2>
              <p>We've received your inquiry regarding <strong>${service || "our services"}</strong>.</p>
              <p>Our team of expert planners is already reviewing your details. One of our lead planners will contact you within the next 24 hours to discuss how we can bring your vision to life.</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 12px; color: #666;">
                <strong>The RED Company</strong><br />
                Bangalore's Premier Event Architects<br />
                Rajajinagar, Bangalore
              </p>
            </div>
          `,
        });

        if (userEmail.error) {
          console.error("Resend User Email Error:", userEmail.error);
          // We don't necessarily want to fail the whole request if only the "thank you" email fails,
          // but for debugging purposes, let's log it clearly.
        }

        res.json({ success: true });
      } else {
        console.warn("RESEND_API_KEY is not set. Email not sent.");
        // Fallback or error
        res.status(500).json({ error: "Email service not configured. Please set RESEND_API_KEY." });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
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
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

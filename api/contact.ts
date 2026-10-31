import type { IncomingMessage, ServerResponse } from "http";
import { Resend } from "resend";

interface ContactRequestBody {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
  _hp?: string; // Honeypot field for bot spam detection
}

interface VercelRequest extends IncomingMessage {
  body?: any;
  query?: Record<string, string | string[]>;
  method?: string;
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (body: any) => void;
  setHeader: (name: string, value: string) => this;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST method
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      error: "Method Not Allowed",
      message: "Only POST requests are supported at this endpoint."
    });
  }

  // Parse body if it's a string (e.g., standard buffer)
  let body: ContactRequestBody = {};
  try {
    if (typeof req.body === "string") {
      body = JSON.parse(req.body);
    } else if (req.body && typeof req.body === "object") {
      body = req.body;
    }
  } catch (err) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Invalid JSON payload."
    });
  }

  const { name, email, service, message, _hp } = body;

  // 1. Spam mitigation: Honeypot check
  if (_hp) {
    // Silently return success to mislead spambots without sending emails
    return res.status(200).json({ success: true });
  }

  // 2. Input validation
  const trimmedName = (name || "").trim();
  const trimmedEmail = (email || "").trim();
  const trimmedService = (service || "General Inquiry").trim();
  const trimmedMessage = (message || "").trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return res.status(400).json({
      error: "Missing required fields",
      details: "Name, email, and message are all required."
    });
  }

  if (trimmedName.length > 120) {
    return res.status(400).json({
      error: "Invalid input",
      details: "Name exceeds maximum length of 120 characters."
    });
  }

  if (trimmedEmail.length > 150 || !EMAIL_REGEX.test(trimmedEmail)) {
    return res.status(400).json({
      error: "Invalid email",
      details: "Please provide a valid email address."
    });
  }

  if (trimmedMessage.length > 5000) {
    return res.status(400).json({
      error: "Invalid input",
      details: "Message exceeds maximum length of 5000 characters."
    });
  }

  // 3. Initialize Resend
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return res.status(500).json({
      error: "Email service not configured",
      details: "RESEND_API_KEY is missing from environment variables."
    });
  }

  const resend = new Resend(apiKey);
  const fromEmail = process.env.RESEND_FROM_EMAIL || "The RED Company <connect@theredcompany.co.in>";

  // Safe HTML sanitization for email body
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
    // 4. Send enquiry notification to the business
    const businessEmailResult = await resend.emails.send({
      from: fromEmail,
      to: "connect@theredcompany.co.in",
      replyTo: trimmedEmail,
      subject: `New Event Enquiry: ${trimmedService} from ${trimmedName}`,
      text: `New Event Enquiry Received:\n\nName: ${trimmedName}\nEmail: ${trimmedEmail}\nService: ${trimmedService}\n\nMessage:\n${trimmedMessage}\n\n--\nSubmitted via https://www.theredcompany.co.in/`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0A0A0A; color: #FFFFFF; border-radius: 16px; border: 1px solid #222;">
          <div style="border-bottom: 2px solid #E63946; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="color: #E63946; margin: 0; font-size: 22px; letter-spacing: 1px; text-transform: uppercase;">New Event Enquiry</h1>
            <p style="color: #888; font-size: 13px; margin: 6px 0 0 0;">Received from the RED Company website</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; width: 120px; text-transform: uppercase;">Client Name:</td>
              <td style="padding: 10px 0; color: #FFF; font-weight: bold; font-size: 15px;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; text-transform: uppercase;">Client Email:</td>
              <td style="padding: 10px 0; color: #E63946; font-size: 15px;"><a href="mailto:${safeEmail}" style="color: #E63946; text-decoration: none;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; text-transform: uppercase;">Service Type:</td>
              <td style="padding: 10px 0; color: #FFF; font-size: 15px;">${safeService}</td>
            </tr>
          </table>
          <div style="background: #141414; padding: 18px; border-radius: 10px; border-left: 4px solid #E63946; margin-bottom: 24px;">
            <p style="color: #888; font-size: 11px; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 1px;">Message / Project Brief:</p>
            <p style="color: #DDD; font-size: 14px; line-height: 1.6; margin: 0;">${safeMessage}</p>
          </div>
          <div style="border-top: 1px solid #222; padding-top: 16px; font-size: 12px; color: #666; text-align: center;">
            The RED Company &bull; Bangalore's Premier Event Architects &bull; Rajajinagar, Bangalore
          </div>
        </div>
      `
    });

    if (businessEmailResult.error) {
      console.error("Resend Business Email Error:", businessEmailResult.error);
      return res.status(500).json({
        error: "Failed to send enquiry email",
        details: businessEmailResult.error.message
      });
    }

    // 5. Send automated customer acknowledgement email
    try {
      await resend.emails.send({
        from: fromEmail,
        to: trimmedEmail,
        subject: "Thank You for Contacting The RED Company",
        text: `Dear ${trimmedName},\n\nThank you for reaching out to The RED Company regarding ${trimmedService}.\n\nOur team of expert event architects in Bangalore has received your message and is already reviewing your details. One of our lead planners will connect with you within 24 hours to discuss how we can bring your vision to life.\n\nWarm regards,\nThe RED Company\nRajajinagar, Bangalore, India\nPhone: +91 82174 48031 / +91 79750 18465\nWebsite: https://www.theredcompany.co.in/`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #0A0A0A; color: #FFFFFF; border-radius: 16px; border: 1px solid #222;">
            <div style="text-align: center; margin-bottom: 28px;">
              <span style="color: #888; font-size: 11px; letter-spacing: 4px; text-transform: uppercase;">The</span>
              <h1 style="color: #E63946; margin: 4px 0; font-size: 32px; letter-spacing: 2px; font-weight: 900;">RED</h1>
              <span style="color: #888; font-size: 11px; letter-spacing: 4px; text-transform: uppercase;">Company</span>
              <p style="color: #E63946; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-top: 8px;">Bangalore's Premier Event Architects</p>
            </div>
            <div style="border-top: 1px solid #222; border-bottom: 1px solid #222; padding: 24px 0; margin-bottom: 24px;">
              <h2 style="color: #FFF; font-size: 18px; margin: 0 0 12px 0;">Hello ${safeName},</h2>
              <p style="color: #AAA; font-size: 14px; line-height: 1.7; margin: 0 0 12px 0;">
                Thank you for reaching out to us regarding <strong>${safeService}</strong>.
              </p>
              <p style="color: #AAA; font-size: 14px; line-height: 1.7; margin: 0;">
                Our lead planners are reviewing your details. We will contact you within the next 24 hours to discuss how we can craft an unforgettable experience for your event.
              </p>
            </div>
            <div style="background: #141414; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
              <p style="color: #888; font-size: 12px; margin: 0 0 4px 0;">Need immediate assistance?</p>
              <p style="color: #FFF; font-size: 13px; margin: 0;">
                Direct Call: <a href="tel:+918217448031" style="color: #E63946; text-decoration: none;">+91 82174 48031</a> / <a href="tel:+917975018465" style="color: #E63946; text-decoration: none;">+91 79750 18465</a>
              </p>
            </div>
            <div style="font-size: 11px; color: #666; text-align: center; line-height: 1.6;">
              &copy; 2026 The RED Company. Rajajinagar, Bangalore, Karnataka, India.<br />
              <a href="https://www.theredcompany.co.in/" style="color: #888; text-decoration: none;">www.theredcompany.co.in</a>
            </div>
          </div>
        `
      });
    } catch (ackError) {
      console.warn("Customer acknowledgement email delivery failed:", ackError);
      // Non-fatal: business enquiry was delivered successfully
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry submitted successfully. We will contact you shortly."
    });
  } catch (err: any) {
    console.error("Unexpected error submitting contact form:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      details: err?.message || "An unexpected error occurred."
    });
  }
}

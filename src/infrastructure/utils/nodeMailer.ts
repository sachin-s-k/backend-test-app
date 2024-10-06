import nodemailer from "nodemailer";
import { EmailConfig } from "../../config/emailConfig";

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: EmailConfig.host,
      port: EmailConfig.port,
      secure: EmailConfig.secure,
      auth: {
        user: EmailConfig.user,
        pass: EmailConfig.pass,
      },
    });
  }

  emailTemplate(eventName: string, loginLink: string) {
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Template Preview</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        background-color: #ffffff;
      }
      .header {
        text-align: center;
        padding: 20px 0;
        background-color: #ff791f; /* Company Background Color */
        border-radius: 8px 8px 0 0;
        color: #ffffff;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .header p {
        margin: 0;
        font-size: 16px;
      }
      .content {
        padding: 20px;
      }
      .content p {
        font-size: 16px;
        color: #333333;
      }
      .highlight-text {
        font-weight: bold;
        color: #ff791f; /* Highlight Color */
      }
      .cta-button {
        text-align: center;
        margin: 20px 0;
      }
      .cta-button a {
        display: inline-block;
        padding: 12px 24px;
        background-color: #ff791f; /* Invitation Button Background */
        color: #ffffff;
        text-decoration: none;
        border-radius: 4px;
        font-size: 16px;
      }
      .footer {
        padding: 20px;
        text-align: center;
        background-color: #f1f1f1;
        border-radius: 0 0 8px 8px;
        font-size: 14px;
        color: #666666;
      }
      .footer a {
        color: #ff791f; /* Link Color */
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h1>The Lit School, Bangalore</h1>
        <p>Learn Innovate Transform</p>
      </div>

      <!-- Content -->
      <div class="content">
        <p>Hello,</p>
        <p>
          We are pleased to inform you that you have successfully registered for
          the event: <strong>${eventName}</strong>.
        </p>
        <p>
          To view more details about the event, please click the link below to
          log in and accept your invitation:
        </p>

        <!-- Call-to-Action Button -->
        <div class="cta-button">
          <a href="${loginLink}">Accept Invitation</a>
        </div>

        <p>
          If you haven't signed up yet, please complete the sign-up process
          after clicking the above button. If you already have an account, just
          log in to confirm your participation in the event.
        </p>
        <p>
          We look forward to your active participation and hope you have a
          wonderful experience at the event!
        </p>
        <p>Best regards,</p>
        <p>The Lit School, Bangalore Team</p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>The Lit School, Bangalore | Learn Innovate Transform</p>
        <p>
          <a href="#">Visit our Website</a> |
          <a href="#">Contact Support</a>
        </p>
      </div>
    </div>
  </body>
</html>
`;
  }

  public async sendEventNotification(
    recipients: string[],
    eventName: string,
    loginLink: string
  ) {
    const mailOptions = {
      from: `${EmailConfig.user}`,
      to: recipients.join(","),
      subject: `Invitation to Join Event: ${eventName}`,
      html: this.emailTemplate(eventName, loginLink),
    };

    return this.transporter.sendMail(mailOptions);
  }
}

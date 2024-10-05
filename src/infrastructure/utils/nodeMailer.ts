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

  public async sendEventNotification(
    recipients: string[],
    eventName: string,
    loginLink: string
  ) {
    const mailOptions = {
      from: `${EmailConfig.user}`,
      to: recipients.join(","),
      subject: `Invitation to Join Event: ${eventName}`,
      html: `
        <p>Hello,</p>
        <p>You have been invited to join the event: <strong>${eventName}</strong>.</p>
        <p>Please <a href="${loginLink}">click here</a> to log in and accept the invitation.</p>
        <p>Best regards,</p>
        <p>Your Event Team</p>
      `,
    };

    return this.transporter.sendMail(mailOptions);
  }
}

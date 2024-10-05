import dotenv from "dotenv";

dotenv.config();

export const EmailConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  user: process.env.NODE_MAIL,
  pass: process.env.NODE_MAIL_PASSWORD,
};

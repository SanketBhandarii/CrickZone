import { config } from "dotenv";

config({
  path: "src/config/.env",
});

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (email, verificationIdentifier) => {
  const verificationLink = `http://crick-zone.vercel.app/verifyEmail/${verificationIdentifier}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to CrickZone - Verify Your Email",
      html: `<p>Click the link below to verify your email:</p>
             <a href="${verificationLink}">${verificationLink}</a>`,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

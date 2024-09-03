"use server";

import { z } from 'zod';
import nodemailer from 'nodemailer';

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  message: z.string().min(1, "Message is required"),
});

export async function submitContact(formData: z.infer<typeof contactSchema>) {
  try {
    const validatedData = contactSchema.parse(formData);

    // Create a transporter using SMTP with environment variables
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // Use TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      },
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Contact Form" <${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL,
      subject: "New Contact Form Submission",
      text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nMessage: ${validatedData.message}`,
      html: `<p><strong>Name:</strong> ${validatedData.name}</p>
             <p><strong>Email:</strong> ${validatedData.email}</p>
             <p><strong>Message:</strong> ${validatedData.message}</p>`,
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, message: "Message sent successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    console.error("Error sending email:", error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
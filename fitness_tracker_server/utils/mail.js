import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

export async function sendDailyEmail(email, name) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Daily Fitness Reminder ",
      text: `Hey ${name},\n\nStay on track with your fitness goals! Remember to log your workouts and nutrition today.\n\nStay strong!`,
    });
  } catch (error) {
    console.error("Email sending error:", error);
  }
}
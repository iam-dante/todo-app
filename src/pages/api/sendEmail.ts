// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer"

import UserProfile from "@/utils/userProfile";
import console from "console";
const prisma = new PrismaClient();

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {

     const data = req.body;

     console.log("sending email notification")
   
    const transporter = nodemailer.createTransport({
      host: "todoapp.iam-brian.dev/",
      service: "gmail",
      auth: {
        user: "bryangasper2124@gmail.com",
        pass: "gilbbewcxodbmkda",
      },
    });

    const mailOptions = {
      from: "hello@example.com",
      to: "bryangasper12@gmail.com",
      subject: "Subject",
      text: "Email content",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        // do something useful
        return res.status(200).json({ name:  info.response});
      }
    });

  } else {
    console.log("Something");
  }
}

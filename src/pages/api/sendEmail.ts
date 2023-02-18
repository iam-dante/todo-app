// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer"

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
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: "todoapp@app.com",
      to: data.email,
      subject: "Todo App",
      text: `You have been add to a Todolist by ${data.user} ${data.email} please login in to the TodoApp`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        
        return res.status(200).json({ name:  info.response});
      }
    });

  } else {
    console.log("Something went wrong");
  }
}

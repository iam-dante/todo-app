// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

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

    // console.log(data.userEmail);

    const isuser = await prisma.user.findFirst({
      where: {
        email: data.userEmail,
      },
    });

    // console.log(isuser);
    // const user = await prisma.user.create({
    //   data: {
    //     email: data.userEmail
    //   },
    // });

    return res.status(200).json({ name: "Successful" });
  } else {
    console.log("Something");
  }
}

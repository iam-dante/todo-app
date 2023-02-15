// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


import UserProfile from "@/utils/userProfile";


const prisma = new PrismaClient();


type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  // const [user]
  if (req.method === "POST") {
    const data = req.body;

    // console.log(data.userEmail);

    const isuser = await prisma.user.findFirst({
      where: {
        email: UserProfile.email,
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

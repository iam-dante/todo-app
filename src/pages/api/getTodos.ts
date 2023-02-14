// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

// type Data = {
//   name: string;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {

    const User = await prisma.user.findFirst({
      where: {
        email: "test@test.co.tz",
      },
    });

    // Read User Todolist
    const Todolist = await prisma.todoList.findMany({
      where: {
        userId: User?.id,
      },
      select: {
        id:true,
        name: true,
        todoItems: true,
      },
    });

    // console.log(Todolist);

    return res.status(200).json({ data: Todolist});
  } else {
    console.log("Something");
  }
}

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
    const { email } = req.query;

    // console.log(typeof(email))
    const User = await prisma.user.findUnique({
      where: {
        email: String(email),
      },
    });

    if (!User) {
      // Read User Todolist
      // const Todolist = await prisma.todoList.findMany({
      //   where: {
      //     userId: User?.id,
      //   },
      //   select: {
      //     id:true,
      //     name: true,
      //     todoItems: true,
      //   },
      // });

      // return res.status(200).json({ data: Todolist });

      const user = await prisma.user.create({
        data: {
          email: String(email),
        },
      });
    } else {
      const Todolist = await prisma.todoList.findMany({
        where: {
          userId: {
            has: User?.id,
          },
        },

        select: {
          todoItems: true,
          name: true,
          id: true,
          User: true,
        },
      });

      return res.status(200).json({ data: Todolist.reverse() });
    }
  } else {
    console.log("Something");
  }
}

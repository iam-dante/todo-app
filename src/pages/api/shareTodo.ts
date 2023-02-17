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
  if (req.method === "POST") {
    // const { email } = req.query;

    const data = req.body;
    // console.log("User Email", email)

    console.log(data.email);
    console.log(data.todoId);

    const User = await prisma.user.findUnique({
      where: {
        email: data.email.trim(),
      },
    });

    // console.log(User);

    if (!User) {
      //   console.log("Something to happen");
      const user = await prisma.user.create({
        data: {
          email: data.email,
        },
      });

      const todoId = await prisma.todoList.findUnique({
        where: {
          id: data.todoId,
        },
      });

      const shareTodo = await prisma.todoList.update({
        where: {
          id: data.todoId,
        },
        data: {
          userId: {
            set: [...todoId?.userId, user.id],
          },
        },
      });

      return res.status(200).json({ data: shareTodo });
    } else {
      const todoId = await prisma.todoList.findUnique({
        where: {
          id: data.todoId,
        },
      });

      const shareTodo = await prisma.todoList.update({
        where: {
          id: data.todoId,
        },
        data: {
          userId: {
            set: [...todoId?.userId, User.id],
          },
        },
      });

      return res.status(200).json({ data: shareTodo });
    }
  } else {
    console.log("Something");
  }
}

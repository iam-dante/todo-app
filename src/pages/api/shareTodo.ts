// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;
   
    const User = await prisma.user.findUnique({
      where: {
        email: data.email.trim(),
      },
    });

    if (!User) {
      
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
    console.log("Something went wrong");
  }
}

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
    console.log(data)
    
    const User = await prisma.user.findFirst({
      where: {
        email: "test@test.co.tz",
      },
    });

    const CreateTodo = await prisma.todoList.create({
      // where: { userId: User.id },
      data: {
        name: data.todoListName,
        todoItems: {
          create: [...data.todoListItems],
        },
        userId: User?.id,
      },
    });

    return res.status(200).json({ name: "Successful" });
  } else {
    console.log("Something");
  }
}

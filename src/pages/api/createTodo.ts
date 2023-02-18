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

    
    const User = await prisma.user.findFirst({
      where: {
        email: data.email
      },
    });
    

    const CreateTodo = await prisma.todoList.create({
      
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
    console.log("Something wrong request");
  }
}

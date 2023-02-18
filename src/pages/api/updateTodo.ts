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


    const updateTodo = await prisma.todoList.update({
      where: { id: data.todoListId },
      data: {
        name: data.todoListName,
      },
    });

    data.todoListItems.forEach(async (value) => {

      if (value.id) {
        const updateTodo = await prisma.todoItem.update({
          where: {
            id: value.id,
          },
          data: {
            name: value.name,
            complete: value.complete,
          },
        });

      } else {

        const createTodoItem = await prisma.todoItem.create({
          data: {
            name: value.name,
            complete: value.complete,
            todoListId:data.todoListId
          },
        });
      }
    });

    return res.status(200).json({ name: "Successful" });
  } else {
    console.log("Something went wrong");
  }
}

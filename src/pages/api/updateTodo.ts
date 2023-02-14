// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { idText } from "typescript";

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

    console.log("Update Data", data);

    const User = await prisma.user.findFirst({
      where: {
        email: "test@test.co.tz",
      },
    });

    // const updateTodo = await prisma.todoList.upsert({
    //   where: { id: data.todoListId },
    //   create: {
    //     name: data.todoListName,
    //     todoItems: {
    //       create: [...data.todoListItems],
    //     },
    //     userId: User?.id,
    //   },
    // //   update: {
    // //     // todoItems: [...data.todoListItems],
    // //     name: data.todoListName,
    // //     // todoItems: {
    // //     //   create: [...data.todoListItems],
    // //     // },
    // //   },
    // });

    const updateTodo = await prisma.todoList.update({
      where: { id: data.todoListId },
      data: {
        name: data.todoListName,
      },
    });

    data.todoListItems.forEach(async (value) => {
      // console.log(value);
      // const updateTodo = await prisma.todoItem.upsert({
      //   where: { id: value.id },
      //   data: {
      //     name: value.name,
      //     complete: value.complete
      //   },
      // });

      if (value.id) {
        const updateTodo = await prisma.todoItem.update({
          // where: { id: value.id, todoListId:value.todoListId},
          where: {
            id: value.id,
          },
          data: {
            name: value.name,
            complete: value.complete,
          },
        });

        console.log("Id is in");
      } else {
        console.log("id is out");
        const createTodoItem = await prisma.todoItem.create({
          // where: {
          //   todoLisrId: value.todoListId,
          // },
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
    console.log("Something");
  }
}

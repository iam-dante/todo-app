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

    console.log("Update Data",data);

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
         todoItems: {
           createMany: {
             data: [{ name: "Make More money", complete: true }],
           },
         },
       },
     });

    return res.status(200).json({ name: "Successful" });
  } else {
    console.log("Something");
  }
}

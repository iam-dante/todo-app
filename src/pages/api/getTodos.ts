// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

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
    // console.log("User Email", email)

    const User = await prisma.user.findUnique({
      where: {
        email: email,
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

      console.log("Something to happen");

      const user = await prisma.user.create({
        data: {
          email: email,
        },
      });

      console.log(user);
    } else {
      // Read User Todolist
      // const Todolist = await prisma.todoList.findMany({
      //   where: {
      //     userId: User?.id,
      //   },
      //   select: {
      //     id: true,
      //     name: true,
      //     todoItems: true,
      //   },
      // });

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

      return res.status(200).json({ data: Todolist });

      // async function fetchData() {
      //   const todos = await axios({
      //     method: "POST",
      //     url: "/api/createUser",
      //     data:email
      //   });
      // }

      // fetchData().then((rs)=>{
      //   console.log(rs)
      // })

      console.log("Something is happening");

      // const user = await prisma.user.create({
      //   data: {
      //     email: email,
      //   },
      // });

      // const User = await prisma.user.findUnique({
      //   where: {
      //     email: email,
      //   },
      // });

      console.log(User);

      // // Read User Todolist
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
    }
  } else {
    console.log("Something");
  }
}

import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseAuth } from "../utils/FirebaseService";

import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/LoginScreen";

import axios from "axios";

import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export default function App(props) {
  const [user, loading, error] = useAuthState(FirebaseAuth);


  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  if (!user) {
    return <LoginScreen />;
  }

  // user.email;
  // return <HomeScreen data={props.todo} />;
  return <HomeScreen/>
}

// function getBaseUrl() {
//   if (process.env.NODE_ENV === "development") {
//     return `http://localhost:${process.env.PORT ?? 3000}`;
//   }
//   return process.env.VERCEL_URL;
// }

// export async function getServerSideProps() {
//   const res = await axios({
//     method: "GET",
//     url: `${getBaseUrl()}/api/createUser`,
//     data:{

//     }
//   });

//   console.log({ data: res.data });
//   // const res = await fetch("api/getTodos");

//   // console.log(res.json());

//   //   const data = await res.json();
//   //   console.log(data)

//   // const res = await fetch("https://catfact.ninja/fact");
//   // const data = await res.json();

//   // console.log(data)
//   // const User = await prisma.user.findFirst({
//   //   where: {
//   //     email: "test@test.co.tz",
//   //   },
//   // });

//   // Read User Todolist
//   // const Todolist = await prisma.todoList.findMany({
//   //   where: {
//   //     userId: User?.id,
//   //   },
//   //   select: {
//   //     id: true,
//   //     name: true,
//   //     todoItems: true,
//   //   },
//   // });

//   // console.log(Todolist);

//   const User = await prisma.user.findFirst({
//     where: {
//       email: "test@test.co.tz",
//     },
//   });

//   // Read User Todolist
//   const Todolist = await prisma.todoList.findMany({
//     where: {
//       userId: User?.id,
//     },
//     select: {
//       id: true,
//       name: true,
//       todoItems: true,
//     },
//   });

//   // console.log(Todolist)

//   return {
//     props: {
//       todo: Todolist.reverse(),
//     }, // will be passed to the page component as props
//     // revalidate:10,
//     // fallback: true
//   };
// }

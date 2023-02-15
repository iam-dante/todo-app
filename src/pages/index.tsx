import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseAuth } from "../utils/FirebaseService";

import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/LoginScreen";

import axios from "axios";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  return <HomeScreen />;
}

// function getBaseUrl() {
//   if (process.env.NODE_ENV === "development") {
//     return `http://localhost:${process.env.PORT ?? 3000}`;
//   }
//   return process.env.VERCEL_URL;
// }

export async function getServerSideProps() {
  // const user = await prisma.user.create({
  //   data: {
  //     email: "vanessaMbuzi@gmail.com",
  //   },
  // });

  const isuser = await prisma.user.findFirst({
    where: {
      // email: "vanessaMbuzi@gmail.com"
      email: "bryangasper2124@gmail.com",
    },
  });

  // console.log(user);

  // console.log(isuser);

  // GET USERID'S OF TODOLIST
  const todoId = await prisma.todoList.findUnique({
    where: {
      id: "63ed35eeb8d05de16dc45452",
    },
  });

  console.log(todoId);

  // CREATE A TODOLIST SHARED

  // const shareTodo = await prisma.todoList.update({
  //   where: {
  //     // Todolist Id
  //     id: "63ed35eeb8d05de16dc45452",
  //   },
  //   data: {
  //     userId: {
  //       set: ["63ed337bb8d05de16dc45437", "63ed3387b8d05de16dc4543e"],
  //     },
  //   },
  // });

  // GET TODOS OF A USER
  const Todo = await prisma.todoList.findMany({
    where: {
      userId: {
        has: "63ed337bb8d05de16dc45437",
      },
    },

    select: {
      todoItems: true,
      name: true,
      id: true,
      User: true,
    },
  });

  console.log("-------New Results-------");
  console.log(Todo);

  return {
    props: {
      // todo: user,
    }, // will be passed to the page component as props
    // revalidate:10,
    // fallback: true
  };
}

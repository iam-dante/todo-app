import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseAuth } from "../utils/FirebaseService";

import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/LoginScreen";
import { Toaster } from "react-hot-toast";


export default function App() {
  const [user, loading, error] = useAuthState(FirebaseAuth);

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }

  if (error) {
    // return <Toaster />;
    console.log("something went wrong")
  }

  if (!user) {
    return <LoginScreen />;
  }

  return <HomeScreen />;
}

// function getBaseUrl() {
//   if (process.env.NODE_ENV === "development") {
//     return `http://localhost:${process.env.PORT ?? 3000}`;
//   }
//   return process.env.VERCEL_URL;
// }

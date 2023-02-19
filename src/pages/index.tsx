import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseAuth } from "../utils/FirebaseService";

import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/LoginScreen";
import toast, { Toaster } from "react-hot-toast";

import { Audio } from "react-loader-spinner";

export default function App() {
  const [user, loading, error] = useAuthState(FirebaseAuth);

 
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Audio
          height="80"
          width="80"
          color="#1d4ed8"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  if (error) {
    return (
     toast.error(String(error))
    );
  }

  if (!user) {
    return <LoginScreen />;
  }
  
  return <HomeScreen />;
}

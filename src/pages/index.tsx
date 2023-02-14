import { useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseAuth } from "./FirebaseService";

import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
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

  if (user) {

    return <HomeScreen />;
  }

  return <LoginScreen />;
}

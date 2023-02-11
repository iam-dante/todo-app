import Head from "next/head";
import Image from "next/image";
import LoginScreen from "./LoginScreen";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import HomeScreen from "./HomeScreen";

export default function App() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
   <HomeScreen/>
  );
}

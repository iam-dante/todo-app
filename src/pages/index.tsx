import Head from "next/head";
import Image from "next/image";
import LoginScreen from "./LoginScreen";

import { useState, Fragment } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";

import {

  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { FirebaseAuth, GoogleProvider } from "./FirebaseService";

async function googleSignIn() {
  signInWithPopup(FirebaseAuth, GoogleProvider);
}

function logOut() {
  signOut(FirebaseAuth);
}

export default function App() {
  let [isOpen, setIsOpen] = useState(false);
  const [user, loading, error] = useAuthState(FirebaseAuth);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }

  if (error) {
    console.log(error);
    return (
      <div>
        <h1>Error: {error}</h1>
      </div>
    );
  }

  if (user) {
    return (
      <div className="h-screen bg-white ">
        <div className="flex  w-full items-center justify-between p-4">
          <h1 className="uppercase text-xl">Todo App</h1>
          <div className="flex items-center  space-x-4 ">
            <div className="space-y-2">

            <h1 className="">{user.displayName}</h1>
            <button onClick={() => logOut()}className="bg-red-200 px-4 rounded-full text-red-800">Log Out</button>
            </div>
            <img
              className="h-14 w-14 rounded-full bg-red-700"
              src={user.photoURL}
            />
          </div>
        </div>
        <div className="flex  items-center justify-center space-x-4 py-4">
          <input
            className="h-12 w-1/2 rounded-md border border-gray-500 bg-transparent px-2  focus:outline-none focus:ring-gray-200 "
            placeholder="Search"
          />
          <button
            type="button"
            onClick={openModal}
            className="h-12 rounded-md bg-sky-800 px-2 text-white "
          >
            Create a todo
          </button>
        </div>

        <div className="flex h-screen flex-col items-center space-y-4 px-4">
          <div className="w-full rounded-md border border-gray-600 px-4  py-6 hover:shadow-xl   md:w-1/2">
            <h1>Title</h1>

            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <input type="checkbox" />
                <h1>Something</h1>
              </div>

              <div className="flex items-center space-x-3">
                <input type="checkbox" />
                <h1>Something Eles</h1>
              </div>
            </div>
          </div>
        </div>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title as="h3" className=" leading-6 text-gray-900">
                      <input
                        className="w-full text-xl font-normal focus:outline-none"
                        placeholder="Title"
                      />
                    </Dialog.Title>
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" />
                        <input
                          type="text"
                          className="w-full font-normal focus:outline-none"
                          placeholder="Todo Item"
                        />
                      </div>

                      <div className="flex items-center space-x-3">
                        <input type="checkbox" />
                        <input
                          type="text"
                          className="w-full font-normal focus:outline-none"
                          placeholder="Todo Item"
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Add
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  }

  return <LoginScreen />;
}

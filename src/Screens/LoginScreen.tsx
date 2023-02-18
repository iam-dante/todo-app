import { signInWithPopup } from "firebase/auth";
import { useAsyncFn } from "react-use";

import { FirebaseAuth, GoogleProvider } from "../utils/FirebaseService";

async function googleSignIn() {
  return signInWithPopup(FirebaseAuth, GoogleProvider);
}

export default function LoginScreen():JSX.Element {
  const [state, signIn] = useAsyncFn(googleSignIn)

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center space-y-12">
        <h1 className="text-3xl font-bold">Todo App</h1>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-24 w-24 text-gray-500"
        >
          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
          <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
        </svg>

        <div className="flex h-24 flex-col justify-center space-y-4 bg-white md:w-1/4">
          <button
            onClick={() => signIn()}
            className="w-full rounded-sm bg-sky-700 p-4 text-white hover:border hover:border-sky-700 hover:bg-white hover:text-sky-700"
          >
            Sign in With Google
          </button>
        </div>
      </div>
    </>
  );
}

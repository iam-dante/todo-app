export default function LoginScreen() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-12">
      <h1 className="text-3xl font-bold">Todo App</h1>
      <div className="flex h-24 w-1/4 flex-col justify-center space-y-4 bg-white">
        <div className="flex items-center justify-center">
          <h1 className="uppercase text-gray-500">sign in</h1>
        </div>
        <button className="rounded-sm bg-sky-700 p-4 text-white hover:border hover:border-sky-700 hover:bg-white hover:text-sky-700">
          Sign in With Google
        </button>
      </div>
    </div>
  );
}

import React, { useRef } from "react";
import axios from "axios";

function App() {
  const registerUsername = useRef<HTMLInputElement>(null),
    registerPassword = useRef<HTMLInputElement>(null),
    loginUsername = useRef<HTMLInputElement>(null),
    loginPassword = useRef<HTMLInputElement>(null);

  const registerHandle = (e: any) => {
    e.preventDefault();
  };
  const loginHandle = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="container h-full bg-blue-500 flex justify-center items-center gap-10">
      <form
        onSubmit={registerHandle}
        className="flex flex-col items-center gap-2"
      >
        <h2 className="text-2xl mb-2 text-white font-medium">Register</h2>
        <input
          className="p-1 outline-none rounded"
          name="name"
          type="text"
          placeholder="Email"
          ref={registerUsername}
        />
        <input
          className="p-1 outline-none rounded"
          name="password"
          type="password"
          placeholder="Password"
        />
        <button
          className="bg-indigo-500 text-white px-5 py-0.5 rounded"
          type="submit"
        >
          Register
        </button>
      </form>

      <form onSubmit={loginHandle} className="flex flex-col items-center gap-2">
        <h2 className="text-2xl mb-2 text-white font-medium">Login</h2>
        <input
          className="p-1 outline-none rounded"
          name="name"
          type="text"
          placeholder="Email"
        />
        <input
          className="p-1 outline-none rounded"
          name="password"
          type="password"
          placeholder="Password"
        />
        <button
          className="bg-indigo-500 text-white px-5 py-0.5 rounded"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default App;

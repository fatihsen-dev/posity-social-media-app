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
    <div className="container h-full bg-blue-500 flex justify-center items-center gap-10"></div>
  );
}

export default App;

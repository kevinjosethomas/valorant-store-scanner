import { useState } from "react";
import type { NextPage } from "next";

import Form from "./home/components/Form";

const Home: NextPage = () => {
  const [creds, setCreds] = useState<Record<string, string>>();
  const [store, setStore] = useState<Record<string, string>>();

  return (
    <div className="relative w-screen h-screen">
      <div>
        <div className="root z-[-10] absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-60" />
        <div className="absolute z-[-5] top-0 left-0 w-screen h-screen bg-black bg-opacity-60" />
      </div>
      <div className="z-20 flex flex-col items-center justify-center h-full">
        <Form setStore={setStore} setCreds={setCreds} />
      </div>
    </div>
  );
};

export default Home;

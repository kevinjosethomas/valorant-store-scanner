import { useState } from "react";
import type { NextPage } from "next";

import Form from "./home/components/Form";
import Storefront from "./home/components/Storefront";

const Home: NextPage = () => {
  const [store, setStore] = useState<Record<string, any>[]>();

  return (
    <div className="relative w-screen h-screen">
      <div>
        <div className="root z-[-10] absolute top-0 left-0 w-screen h-screen" />
        <div className="absolute z-[-5] top-0 left-0 w-screen h-screen" />
      </div>
      <div className="z-20 flex flex-col items-center justify-center h-full">
        {store ? <Storefront store={store} /> : <Form setStore={setStore} />}
      </div>
    </div>
  );
};

export default Home;

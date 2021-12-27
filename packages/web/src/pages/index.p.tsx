import { useState } from "react";
import type { NextPage } from "next";

import Form from "./home/components/Form";
import Storefront from "./home/components/Storefront";

const Home: NextPage = () => {
  const [store, setStore] = useState<Record<string, any>[]>();

  return (
    <div className="relative grid w-screen min-h-screen">
      {/* <div>
        <div className={`z-[-10] absolute top-0 left-0 w-screen min-h-screen w-full`} />
      </div> */}
      <div
        className={`z-20 flex flex-col items-center justify-center h-full px-4 md:px-0 ${
          store ? "bg-1" : "bg-2"
        } `}
      >
        {store ? <Storefront store={store} /> : <Form setStore={setStore} />}
      </div>
    </div>
  );
};

export default Home;

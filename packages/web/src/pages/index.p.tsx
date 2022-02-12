import { useState } from "react";
import type { NextPage } from "next";

import Form from "ui/components/Login";
import Storefront from "ui/components/Storefront";

const Home: NextPage = () => {
  const [store, setStore] = useState<Record<string, any>[]>();

  return (
    <div className="relative grid w-screen min-h-screen">
      <div
        className={`z-20 flex flex-col items-center justify-center w-full h-full px-4 md:px-0 ${
          store ? "bg-1" : "bg-r-600"
        } `}
      >
        {store ? <Storefront store={store} /> : <Form setStore={setStore} />}
      </div>
    </div>
  );
};

export default Home;

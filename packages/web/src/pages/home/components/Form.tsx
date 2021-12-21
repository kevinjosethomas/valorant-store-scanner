import axios from "axios";
import { useRef, useState } from "react";

import { Login, GetStorefront } from "api/user";

type FormProps = {
  setStore: (store: any) => void;
};

export default function Form(props: FormProps) {
  const passRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const [login, loginError] = await Login(username, password);

    if (loginError) {
      return;
    }

    const [store, storeError] = await GetStorefront(
      login.payload.id,
      login.payload.access_token,
      login.payload.entitlement_token,
      "na"
    );

    if (storeError) {
      return;
    }

    props.setStore(store.payload);
  }

  return (
    <div className="flex flex-col items-start justify-start space-y-4">
      <div className="flex flex-col items-center justify-start px-8 py-14 space-y-6 bg-white">
        <p className="font-bold text-4xl tracking-tight">Sign In</p>
        <div className="flex flex-col items-start justify-start space-y-3">
          <div className="flex flex-col items-start justify-start py-4 px-6 space-y-1 bg-black bg-opacity-5 rounded">
            <p className="font-bold text-lg text-black text-opacity-40 leading-snug select-none">
              USERNAME
            </p>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-96 font-medium text-xl text-black text-opacity-80 tracking-wide bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex flex-row items-center justify-start w-full py-4 px-6 space-y-1 bg-black bg-opacity-5 rounded">
            <div className="flex flex-col items-start justify-between w-full">
              <p className="font-bold text-lg text-black text-opacity-40 leading-snug select-none">
                PASSWORD
              </p>
              <input
                ref={passRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full font-medium text-xl text-black text-opacity-80 tracking-wide bg-transparent focus:outline-none"
              />
            </div>
            <i
              className="fas fa-eye text-2xl"
              onClick={() => {
                if (!passRef.current) return;
                if (passRef.current.type === "password") {
                  passRef.current.type = "input";
                } else {
                  passRef.current.type = "password";
                }
              }}
            />
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-center w-20 h-20 bg-r-500 hover:bg-r-600 rounded-2xl cursor-pointer transition duration-300"
          onClick={login}
        >
          <i className="far fa-arrow-right text-2xl text-white" />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full p-4 bg-white">
        <p className="max-w-md text-lg text-black text-opacity-70 leading-snug">
          This is not an official Riot or VALORANT login page. This is a third-party application not
          associated with VALORANT.
        </p>
      </div>
    </div>
  );
}

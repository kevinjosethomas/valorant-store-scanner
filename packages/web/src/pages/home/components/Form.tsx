import axios from "axios";
import { useState } from "react";

export default function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const session = await axios.post(
      `${process.env.NEXT_PUBLIC_RIOT_AUTH_URL}/api/v1/authorization`,
      {
        nonce: "1",
        client_id: "play-valorant-web-prod",
        redirect_uri: "https://playvalorant.com/opt_in",
        response_type: "token id_token",
      }
    );

    const cookies = session?.headers["set-cookie"]?.join("; ") as string;

    const auth = await axios.put(
      `${process.env.NEXT_PUBLIC_RIOT_AUTH_URL}/api/v1/authorization`,
      {
        type: "auth",
        username,
        password,
      },
      {
        headers: {
          Cookie: cookies,
        },
      }
    );

    const access_token = auth.data.response.parameters.uri.match(
      /access_token=((?:[a-zA-Z]|\d|\.|-|_)*).*id_token=((?:[a-zA-Z]|\d|\.|-|_)*).*expires_in=(\d*)/
    )[1];

    console.log(access_token);
  }

  return (
    <div className="flex flex-col items-start justify-start space-y-4">
      <div className="flex flex-col items-center justify-start px-8 py-14 space-y-6 bg-white">
        <p className="font-bold text-4xl tracking-tight">Sign In</p>
        <div className="flex flex-col items-start justify-start space-y-3">
          <div className="flex flex-col items-start justify-start p-4 space-y-1 bg-black bg-opacity-5 rounded">
            <p className="font-bold text-lg text-black text-opacity-40 leading-snug">USERNAME</p>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-96 font-medium text-xl text-black text-opacity-80 tracking-wide bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex flex-col items-start justify-start p-4 space-y-1 bg-black bg-opacity-5 rounded">
            <p className="font-bold text-lg text-black text-opacity-40 leading-snug">PASSWORD</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-96 font-medium text-xl text-black text-opacity-80 tracking-wide bg-transparent focus:outline-none"
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

import OnOutsideClick from "react-outclick";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Login, GetStorefront } from "api/user";

type FormProps = {
  setStore: (store: any) => void;
};

type Region = {
  id: string;
  name: string;
};

type RegionProps = {
  region: Region;
  setRegion: (region: Region) => void;
};

type DropdownProps = {
  region: Region;
  dropdown: boolean;
  setRegion: (region: Region) => void;
  showDropdown: (dropdown: boolean) => void;
};

const regions: Region[] = [
  {
    id: "na",
    name: "North America",
  },
  {
    id: "eu",
    name: "Europe",
  },
  {
    id: "ap",
    name: "Asia Pacific",
  },
  {
    id: "kr",
    name: "Korea",
  },
  {
    id: "na",
    name: "Brazil",
  },
  {
    id: "na",
    name: "Latin America",
  },
];

export default function Form(props: FormProps): JSX.Element {
  const passRef = useRef<HTMLInputElement>(null);

  const [seePass, setSeePass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [region, setRegion] = useState(regions[0]);

  useEffect(() => {
    if (!passRef.current) return;
    if (seePass) {
      passRef.current.type = "input";
    } else {
      passRef.current.type = "password";
    }
  }, [seePass]);

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
      <div className="flex flex-col items-center justify-center w-full md:w-[500px] py-8 md:py-12 space-y-6 bg-white">
        <p className="font-bold text-3xl md:text-4xl tracking-tight">Sign In</p>
        <div className="flex flex-col items-start justify-start space-y-3">
          <div className="flex flex-col items-start justify-start w-72 md:w-full py-4 px-4 md:px-6 bg-black bg-opacity-5 rounded">
            <p className="font-medium md:text-lg text-black text-opacity-40 leading-snug select-none">
              Username
            </p>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full md:w-96 font-medium md:text-xl text-black text-opacity-80 bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex flex-row items-center justify-start w-72 md:w-full py-4 px-4 md:px-6 bg-black bg-opacity-5 rounded">
            <div className="flex flex-col items-start justify-between w-full">
              <p className="font-medium md:text-lg text-black text-opacity-40 leading-snug select-none">
                Password
              </p>
              <input
                ref={passRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full font-medium md:text-xl text-black text-opacity-80 bg-transparent focus:outline-none"
              />
            </div>
            <i
              className={`far ${
                seePass ? "fa-eye-slash" : "fa-eye"
              } w-[30px] text-xl md:text-2xl text-black text-opacity-60 cursor-pointer`}
              onClick={() => setSeePass((s) => !s)}
            />
          </div>
          <Region region={region} setRegion={setRegion} />
        </div>
        <div
          className="flex flex-col items-center justify-center w-20 h-20 bg-r-500 hover:bg-r-600 rounded-2xl cursor-pointer transition duration-300"
          onClick={login}
        >
          <i className="far fa-arrow-right text-2xl text-white" />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full md:w-[500px] p-3 md:p-5 bg-white">
        <p className="text-sm md:text-lg text-black text-opacity-60 leading-snug">
          This is not an official Riot or VALORANT login page. This is a third-party application not
          associated with VALORANT.
        </p>
      </div>
    </div>
  );
}

function Region(props: RegionProps) {
  const [dropdown, showDropdown] = useState(false);

  return (
    <div
      className="relative flex flex-row items-center justify-between w-72 md:w-full py-4 px-4 md:px-6 bg-black bg-opacity-5 rounded"
      onClick={() => showDropdown((d) => !d)}
    >
      <div className="flex flex-col items-start justify-start">
        <p className="font-medium md:text-lg text-black text-opacity-40 leading-snug select-none">
          Region
        </p>
        <p className="font-medium md:text-xl text-black text-opacity-80 select-none">
          {props.region.name}
        </p>
      </div>
      {dropdown && (
        <Dropdown
          dropdown={dropdown}
          showDropdown={showDropdown}
          region={props.region}
          setRegion={props.setRegion}
        />
      )}
      <i className="far fa-chevron-down font-medium md:text-lg text-black text-opacity-40 select-none" />
    </div>
  );
}

function Dropdown(props: DropdownProps) {
  return (
    <OnOutsideClick onOutsideClick={() => props.showDropdown(false)}>
      <div className="absolute flex flex-col items-start justify-start top-24 left-0 w-full py-1 cursor-pointer bg-[#ECECEC] rounded">
        {regions.map((region, index) => (
          <div
            key={index}
            className={`flex flex-row items-center justify-start w-full px-4 py-1 ${
              props.region.name === region.name
                ? "bg-black bg-opacity-5"
                : "hover:bg-black hover:bg-opacity-5 transition duration-300"
            } `}
            onClick={() => props.setRegion(region)}
          >
            <p className="font-medium md:text-xl text-black text-opacity-50 select-none">
              {region.name}
            </p>
          </div>
        ))}
      </div>
    </OnOutsideClick>
  );
}

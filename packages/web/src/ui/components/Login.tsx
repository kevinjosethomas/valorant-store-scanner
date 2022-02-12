import OutsideClickHandler from "react-outside-click-handler";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { MouseEventHandler, useEffect, useRef, useState } from "react";

import { Login, GetStorefront } from "api/user";

type Region = {
  id: string;
  name: string;
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

type FormProps = {
  setStore: (store: any) => void;
};

type InputProps = {
  type: string;
  value: string;
  label: string;
  setValue: (value: string) => void;
};

type DropdownProps = {
  region: Region;
  setRegion: (region: Region) => void;
};

type SaveDetailsProps = {
  saveDetails: boolean;
  setSaveDetails: (bool: boolean) => void;
};

type SubmitProps = {
  loading: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
};

export default function Form(props: FormProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [region, setRegion] = useState(regions[0]);
  const [saveDetails, setSaveDetails] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("VALORANT-USERNAME") || "";
    const storedPassword = localStorage.getItem("VALORANT-PASSWORD") || "";
    const storedRegionID = localStorage.getItem("VALORANT-REGION");

    setUsername(storedUsername);
    setPassword(storedPassword);

    const storedRegion = regions.find((region) => region.id === storedRegionID);

    if (storedRegion) {
      setRegion(storedRegion);
    }

    if (storedUsername && storedPassword) {
      setSaveDetails(true);
    }
  }, []);

  const submit = async () => {
    setLoading(true);

    if (saveDetails) {
      localStorage.setItem("VALORANT-USERNAME", username);
      localStorage.setItem("VALORANT-PASSWORD", password);
    } else {
      localStorage.removeItem("VALORANT-USERNAME");
      localStorage.removeItem("VALORANT-PASSWORD");
    }

    localStorage.setItem("VALORANT-REGION", region.id);

    const [login, loginError] = await Login(username, password);

    if (loginError) {
      setLoading(false);
      return;
    }

    const [store, storeError] = await GetStorefront(
      login.payload.id,
      login.payload.access_token,
      login.payload.entitlement_token,
      region.id
    );

    if (storeError) {
      setLoading(false);
      return;
    }

    props.setStore(store.payload);

    setLoading(false);
  };

  return (
    <div className="flex bg-white items-start rounded-2xl py-12 px-20 space-x-10">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col">
          <p className="text-4xl font-bold tracking-tight">Sign in to VALORANT</p>
          <p className="text-2xl font-bold tracking-tight">to view your store</p>
        </div>
        <div className="flex flex-col space-y-4 items-start">
          <Dropdown region={region} setRegion={setRegion} />
          <Input label="USERNAME" value={username} setValue={setUsername} type="text" />
          <Input label="PASSWORD" value={password} setValue={setPassword} type="password" />
          <SaveDetails saveDetails={saveDetails} setSaveDetails={setSaveDetails} />
          <Submit loading={loading} onClick={submit} />
        </div>
      </div>
      <div className="w-[4px] h-[75%] self-center bg-black bg-opacity-10 rounded-full" />
      <Disclaimer />
    </div>
  );
}

function Disclaimer(): JSX.Element {
  return (
    <div className="flex flex-col justify-between h-full w-[24rem]">
      <div className="flex flex-col space-y-4">
        <p className="text-4xl font-bold tracking-tight">Disclaimer</p>
        <div className="flex flex-col space-y-2">
          <p className="font-medium">
            This is not an official VALORANT or Riot Games login page. This website is not
            affiliated with VALORANT or Riot Games.
          </p>
          <p>
            Your login details are never stored by us. They are transmitted to our server, sent to
            VALORANT and the response is forwarded back to your browser.
          </p>
          <p>
            However, if you check the <span className="font-medium">Save Login Details</span>{" "}
            option, your login details will be stored in your browser. This is not recommended as
            your login details can be stolen by any malicious browser extensions or scripts on this
            webpage.
          </p>
          <p>
            This website uses an undocumented portion of the VALORANT API. However, this is not
            explicitly against TOS unless abused.
          </p>
          <p>
            This website&apos;s code is on{" "}
            <a
              rel="noreferrer"
              target="_blank"
              href="https://github.com/trustedmercury/valorant-store-scanner"
              className="font-medium underline"
            >
              GitHub
            </a>{" "}
            to verify it&apos;s authenticity. I am not responsible for any actions taken on your
            account.
          </p>
        </div>
      </div>
      <p>
        Developed by{" "}
        <a
          rel="noopener"
          target="_blank"
          href="https://kevinthomas.codes/"
          className="text-r-600 font-bold"
        >
          Kevin Thomas
        </a>
      </p>
    </div>
  );
}

function Input(props: InputProps): JSX.Element {
  const inputReference = useRef<HTMLInputElement>(null);

  const [focused, setFocused] = useState(false);
  const [seePassword, setSeePassword] = useState(false);

  useEffect(() => {
    if (!inputReference.current || props.type !== "password") return;
    if (seePassword) {
      inputReference.current.type = "input";
    } else {
      inputReference.current.type = "password";
    }
  }, [seePassword]);

  return (
    <div
      className={`flex items-center justify-between w-96 bg-black bg-opacity-5 px-4 py-4 rounded-lg ${
        focused && "outline outline-2 outline-r-400"
      }`}
    >
      <div className="flex flex-col w-full">
        <p className="text-sm text-black text-opacity-60 select-none">{props.label}</p>
        <input
          value={props.value}
          ref={inputReference}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => props.setValue(e.target.value)}
          className="focus:outline-none bg-transparent font-medium w-full py-1 text-xl"
          spellCheck={false}
          type={props.type}
        />
      </div>
      {props.type === "password" && (
        <i
          className={`far ${
            seePassword ? "fa-eye-slash" : "fa-eye"
          } text-2xl text-black cursor-pointer`}
          onClick={() => setSeePassword((x) => !x)}
        />
      )}
    </div>
  );
}

function Dropdown(props: DropdownProps): JSX.Element {
  const controls = useAnimation();
  const [dropdown, showDropdown] = useState(false);

  useEffect(() => {
    if (dropdown) {
      controls.start({
        rotate: 180,
      });
    } else {
      controls.start({
        rotate: 360,
      });
    }
  }, [dropdown]);

  return (
    <div
      className="relative flex w-96 items-center justify-between bg-black bg-opacity-5 px-4 py-4 rounded-lg cursor-pointer"
      onClick={() => showDropdown(true)}
    >
      <div className="flex flex-col w-full">
        <p className="text-sm text-black text-opacity-60 select-none">REGION</p>
        <p className="font-medium w-full py-1 text-xl select-none">{props.region.name}</p>
      </div>
      <AnimatePresence>
        {dropdown && (
          <OutsideClickHandler onOutsideClick={(e) => showDropdown(false)}>
            <motion.div
              className="absolute top-24 left-0 flex flex-col w-full bg-[#f2f2f2] rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              {regions.map((region, index) => (
                <div
                  key={index}
                  className="flex px-4 py-1.5 hover:bg-black hover:bg-opacity-5 transition duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    props.setRegion(region);

                    showDropdown(false);
                  }}
                >
                  <p className="font-medium text-lg text-black text-opacity-60 select-none">
                    {region.name}
                  </p>
                </div>
              ))}
            </motion.div>
          </OutsideClickHandler>
        )}
      </AnimatePresence>
      <motion.i className="far fa-angle-down text-2xl text-black" animate={controls} />
    </div>
  );
}

function SaveDetails(props: SaveDetailsProps): JSX.Element {
  return (
    <div
      className="flex items-center space-x-2 cursor-pointer"
      onClick={() => props.setSaveDetails((x) => !x)}
    >
      <div
        className={`flex items-center justify-center w-8 h-8 ${
          props.saveDetails
            ? "bg-r-400"
            : "bg-black bg-opacity-5 border-2 border-black border-opacity-5"
        } rounded-lg transition duration-200`}
      >
        {props.saveDetails && <i className="far fa-check text-white" />}
      </div>
      <p className="text-lg font-medium select-none">Save Login Details*</p>
    </div>
  );
}

function Submit(props: SubmitProps): JSX.Element {
  return (
    <div
      className="flex items-center justify-center w-full py-5 bg-r-500 hover:bg-r-600 cursor-pointer transition duration-300 rounded-lg"
      onClick={props.onClick}
    >
      {props.loading ? (
        <img src="/icons/loading.svg" alt="loading" className="w-[30px] h-[30px]" />
      ) : (
        <i className="far fa-arrow-right text-3xl text-white" />
      )}
    </div>
  );
}

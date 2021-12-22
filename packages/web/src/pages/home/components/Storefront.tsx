import { Key, useEffect, useState } from "react";

import Card from "./Card";

type StorefrontProps = {
  store: any;
};

function Storefront(props: StorefrontProps): JSX.Element {
  const [duration, setDuration] = useState(props.store.duration);
  const [hours, setHours] = useState(Math.floor(duration / 3600).toString());
  const [minutes, setMinutes] = useState(Math.floor((duration % 3600) / 60).toString());
  const [seconds, setSeconds] = useState((duration % 60).toString());

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration((d: number) => d - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let h = Math.floor(duration / 3600).toString();
    let m = Math.floor((duration % 3600) / 60).toString();
    let s = (duration % 60).toString();
    setHours(h.length === 1 ? "0" + h : h);
    setMinutes(m.length === 1 ? "0" + m : m);
    setSeconds(s.length === 1 ? "0" + s : s);
  }, [duration]);

  return (
    <div className="flex flex-col items-start justify-start w-full h-full p-10">
      <div className="flex flex-col items-start justify-start w-full space-y-10">
        <div className="flex items-center justify-start w-full space-x-5">
          <div className="w-[20%] h-1 space-x-2 bg-white bg-opacity-10" />
          <div className="flex items-center justify-start space-x-4">
            <p className="font-light text-3xl text-white text-opacity-90">OFFERS</p>
            <div className="w-1 h-8 bg-white bg-opacity-20" />
            <div className="flex flex-row items-center justify-center px-4 py-1 space-x-2 select-none bg-white bg-opacity-10 rounded-full">
              <p className="font-light text-2xl text-white text-opacity-90">{hours}</p>
              <div className="flex flex-col items-center justify-center space-y-0.5">
                <div className="w-0.5 h-0.5 bg-white rounded-full" />
                <div className="w-0.5 h-0.5 bg-white rounded-full" />
              </div>
              <p className="font-light text-2xl text-white text-opacity-90">{minutes}</p>
              <div className="flex flex-col items-center justify-center space-y-0.5">
                <div className="w-0.5 h-0.5 bg-white rounded-full" />
                <div className="w-0.5 h-0.5 bg-white rounded-full" />
              </div>
              <p className="font-light text-2xl text-white text-opacity-90">{seconds}</p>
            </div>
          </div>
          <div className="w-full h-1 bg-white bg-opacity-10" />
        </div>
        <div className="grid grid-cols-4 w-full">
          {props.store.skins.map((skin: Record<string, string>, index: Key) => (
            <Card key={index} {...skin} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Storefront;

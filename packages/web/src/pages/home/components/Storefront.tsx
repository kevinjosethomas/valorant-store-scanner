import { Key } from "react";

type StorefrontProps = {
  store: any;
};

function Storefront(props: StorefrontProps): JSX.Element {
  return (
    <div className="grid grid-cols-4 gap-x-5">
      {props.store.skins.map((skin: Record<string, string>, index: Key) => (
        <div key={index} className="w-96 h-96 bg-red-500"></div>
      ))}
    </div>
  );
}

export default Storefront;

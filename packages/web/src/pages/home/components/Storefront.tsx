import { Key } from "react";

import Card from "./Card";

type StorefrontProps = {
  store: any;
};

function Storefront(props: StorefrontProps): JSX.Element {
  return (
    <div className="grid grid-cols-4 gap-x-16">
      {props.store.skins.map((skin: Record<string, string>, index: Key) => (
        <Card key={index} {...skin} />
      ))}
    </div>
  );
}

export default Storefront;

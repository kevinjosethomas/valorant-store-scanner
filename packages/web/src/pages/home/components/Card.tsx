type CardProps = {
  id: string;
  name: string;
  tier: string;
  price?: string;
};

function Card(props: CardProps): JSX.Element {
  const background =
    props.tier === "select"
      ? "from-card-se1 to-card-se2"
      : props.tier === "deluxe"
      ? "from-card-de1 to-card-de2"
      : props.tier === "premium"
      ? "from-card-pe1 to-card-pe2"
      : props.tier === "ultra"
      ? "from-card-ue1 to-card-ue2"
      : props.tier === "exclusive"
      ? "from-card-xe1 to-card-xe2"
      : "from-card-se1 to-card-se2";

  const price = props.price
    ? props.price
    : props.tier === "select"
    ? 875
    : props.tier === "deluxe"
    ? 1275
    : props.tier === "premium"
    ? 1775
    : props.tier === "ultra"
    ? 2475
    : "??";

  return (
    <div
      className={`skincard-outside relative flex flex-col items-start justify-between w-96 h-48 p-3 border-[3px] border-white border-opacity-50 rounded-2xl bg-gradient-to-tr transform hover:scale-[1.01] ${background} transition duration-500 select-none`}
    >
      <img
        src={`/icons/${props.tier}.png`}
        draggable="false"
        alt={`${props.tier} skin`}
        className="iconshadow w-8 h-8"
      />
      <div className="skincard-inside absolute flex items-center justify-center top-0 left-0 w-full h-full overflow-visible">
        <img
          alt={props.name}
          draggable="false"
          className="gunskin absolute z-10 max-w-[24rem] max-h-[7rem] rotate-[35deg]"
          src={`${process.env.NEXT_PUBLIC_API_URL}/public/skins/${props.id}.png`}
        />
        <img
          alt="Background"
          draggable="false"
          src="/icons/arrows.png"
          className="absolute opacity-70 z-0 h-48"
        />
      </div>
      <p className="max-w-[130px] font-normal text-white text-opacity-90 uppercase select-none">
        {props.name}
      </p>
      <div className="absolute flex items-center justify-start -top-11 right-0 space-x-1">
        <img src="/icons/coin.png" draggable="false" alt="Coin" className="w-8 h-8" />
        <p className="text-xl text-white text-opacity-90">{price}</p>
      </div>
    </div>
  );
}

export default Card;

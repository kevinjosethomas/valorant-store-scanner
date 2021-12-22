type CardProps = {
  id: string;
  name: string;
};

function Card(props: CardProps): JSX.Element {
  return (
    <div className="skincard-outside relative w-96 h-48 border-[3px] border-white border-opacity-50 rounded-2xl bg-gradient-to-tr from-card-de1 to-card-de2">
      <div className="skincard-inside flex items-center justify-center w-full h-full overflow-visible">
        <img
          alt={props.name}
          draggable="false"
          className="absolute z-10 max-w-[24rem] max-h-[7rem] rotate-[35deg]"
          src={`${process.env.NEXT_PUBLIC_API_URL}/public/skins/${props.id}.png`}
        />
        <img
          alt="Background"
          draggable="false"
          src="/icons/arrows.png"
          className="absolute opacity-70 z-0 h-48"
        />
      </div>
    </div>
  );
}

export default Card;

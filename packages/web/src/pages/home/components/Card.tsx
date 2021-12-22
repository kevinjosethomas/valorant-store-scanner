type CardProps = {
  id: string;
  name: string;
};

function Card(props: CardProps): JSX.Element {
  return (
    <div className="skincard-outside relative flex flex-col items-start justify-between w-96 h-48 p-3 border-[3px] border-white border-opacity-50 rounded-2xl bg-gradient-to-tr from-card-de1 to-card-de2">
      <p></p>
      <div className="skincard-inside absolute flex items-center justify-center top-0 left-0 w-full h-full overflow-visible">
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
      <p className="max-w-[130px] font-normal text-white text-opacity-90 uppercase select-none">
        {props.name}
      </p>
    </div>
  );
}

export default Card;

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
          className="absolute max-w-fit max-h-24 rotate-45"
          src={`${process.env.NEXT_PUBLIC_API_URL}/public/skins/${props.id}.png`}
        />
      </div>
    </div>
  );
}

export default Card;

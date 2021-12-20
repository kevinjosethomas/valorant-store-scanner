export default function Form() {
  return (
    <div className="flex flex-col items-start justify-start space-y-4">
      <div className="flex flex-col items-center justify-start px-8 py-14 space-y-6 bg-white">
        <p className="font-bold text-4xl tracking-tight">Sign In</p>
        <div className="flex flex-col items-start justify-start space-y-3">
          <div className="flex flex-col items-start justify-start p-4 space-y-1 bg-black bg-opacity-5 rounded">
            <p className="font-bold text-lg text-black text-opacity-40 leading-snug">USERNAME</p>
            <input className="w-96 font-medium text-xl text-black text-opacity-80 tracking-wide bg-transparent focus:outline-none" />
          </div>
          <div className="flex flex-col items-start justify-start p-4 space-y-1 bg-black bg-opacity-5 rounded">
            <p className="font-bold text-lg text-black text-opacity-40 leading-snug">PASSWORD</p>
            <input
              className="w-96 font-medium text-xl text-black text-opacity-80 tracking-wide bg-transparent focus:outline-none"
              type="password"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-20 h-20 bg-r-500 hover:bg-r-600 rounded-2xl cursor-pointer transition duration-300">
          <i className="far fa-arrow-right text-2xl text-white" />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full p-4 bg-white">
        <p className="max-w-md text-lg">
          This is not an official Riot or VALORANT login page. This is a third-party application not
          associated with VALORANT.
        </p>
      </div>
    </div>
  );
}

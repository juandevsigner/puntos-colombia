interface Props {
  count: number;
  name: string;
  img: string;
}

export const CardPoints = ({ count, name, img }: Props) => {
  return (
    <div className="text-center">
      <div className="bg-green-500 rounded-full p-7  flex flex-col items-center justify-center">
        <img className=" w-14 text-center" src={img} alt="imagen-product" />
        <p className=" text-5xl text-white font-semibold text-center">
          {count}
        </p>
      </div>

      <p className="text-lg mt-2">{name}</p>
    </div>
  );
};

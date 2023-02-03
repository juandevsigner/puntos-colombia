import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { IconTree } from "../ui";
import { useStateContext } from "../context/ContextProvider";

export const Sidebar = () => {
  const { checkPort, settimeExpiry } = useStateContext();

  const handleRegistrarbutton = async () => {
    settimeExpiry();
    await checkPort();
  };

  return (
    <div className="p-10 flex flex-col justify-center items-center">
      <Link to={"/user"}>
        <button className="w-72 h-72 rounded-full 
                       bg-green-500  text-white animate-bounce" onClick={handleRegistrarbutton}>
            <p className="text-5xl">Click</p>
            <p className="text-5xl">Aqui</p>
            <p className="text-5xl">Para</p>
            <p className="text-5xl">Iniciar</p>     
        </button>
      </Link>
</div>
  );
};

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
    <div className="bg-white relative h-2/6  p-10 flex flex-col justify-center items-center">
      <IconTree />
      <p className="mb-10  text-4xl">
        Queremos incentivar tu compromiso con la tierra, por cada residuo
        reciclable registrado,{" "}
        <span className="font-bold text-green-600 text-4xl">
          estaremos obsequiándote puntos Colombia.
        </span>
      </p>

      <Link
        className="btn-primary flex items-center justify-between "
        type="button"
        to="/user"
        onClick={handleRegistrarbutton}
      >
        Iniciar
        <MdArrowForwardIos className="text-3xl" />
      </Link>
    </div>
  );
};

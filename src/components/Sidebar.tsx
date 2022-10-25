import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { IconTree } from "../ui";

export const Sidebar = () => {
  return (
    <div className="bg-white relative shadow-lg w-1/4 p-10 flex flex-col justify-center items-center">
      <div className="absolute top-0 left-0"></div>
      <div className="flex flex-col justify-center items-center">
        <IconTree />

        <p className="mb-10  text-2xl">
          Queremos incentivar tu compromiso con la tierra, por cada residuo
          reciclable registrado,{" "}
          <span className="font-bold text-green-600 text-3xl">
            estaremos obsequiándote puntos Colombia.
          </span>
        </p>

        <Link
          className="btn-primary flex items-center justify-between hover:pr-2"
          type="button"
          to="/user"
        >
          Registrar
          <MdArrowForwardIos className="text-xl" />
        </Link>
      </div>
    </div>
  );
};

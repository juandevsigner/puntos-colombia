import { useNavigate } from "react-router-dom";
import { IconTree } from "../ui/IconTree";
import PClogo from "../assets/logoPC.png";
import { useStateContext } from "../context/ContextProvider";
import { useEffect } from "react";

export const Points = () => {
  const { setIdUser, pointsCol } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setTimeout(() => {
      navigate("/");
      setIdUser("");
    }, 15000);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="bg-green-500 p-5 rounded-2xl">
        <p className="text-4xl uppercase text-white ">
          ¡ Felicidades Haz Ganado !
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-green-500 text-9xl">{pointsCol}</p>
        <img className="w-auto h-32" src={PClogo} alt="logo puntos colombia" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <IconTree />
        <p className="text-green-500 text-2xl font-semibold mt-0">
          - Gracias por tu compromiso -
        </p>
      </div>
    </div>
  );
};

import { useNavigate } from "react-router-dom";
import { IconTree } from "../ui/IconTree";
import PClogo from "../assets/logoPC.png";
import { useStateContext } from "../context/ContextProvider";
import { useEffect } from "react";
import { Error } from "../ui";

export const Points = () => {
  const { setIdUser, pointsCol, setNotPoints, notPoints, setLoad, errorBD } =
    useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("userName");
    setTimeout(() => {
      setIdUser("");
      setNotPoints(true);
      setLoad(false);
      navigate("/home");
    }, 5000);
  }, []);

  if (errorBD) {
    return <Error />;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="bg-green-500 p-5 rounded-3xl">
        <p className="text-4xl uppercase text-white ">
          {!notPoints
            ? "¡ Gracias por cuidar el planeta !"
            : "¡ Gracias por cuidar el planeta !"}
        </p>
      </div>
      {!notPoints ? null : (
        <>
          <div className="flex justify-between items-center">
            <p className="text-green-500 text-9xl">{pointsCol}</p>
            <img
              className="w-auto h-40"
              src={PClogo}
              alt="logo puntos colombia"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <IconTree />
            <p className="text-green-500 text-4xl font-semibold mt-0">
              - Gracias por tu compromiso -
            </p>
          </div>
        </>
      )}
    </div>
  );
};

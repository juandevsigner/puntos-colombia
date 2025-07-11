import { useNavigate } from "react-router-dom";
import { IconTree } from "../ui/IconTree";
import PClogo from "../assets/logoPC.png";
import { useStateContext } from "../context/ContextProvider";
import { useEffect, useRef, useState } from "react";
import { Error } from "../ui";
import { BsPersonCircle } from "react-icons/bs";
import { Loading } from "../components/Loading";

export const Points = () => {
  const { pointsCol, givePoints,setGivePoints, setLoad, bonoselected, userPC, setUserPC, setPoints, load } =
    useStateContext();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");

  const hasGivenPoints = useRef(false);

  const clearVariables = () => {
    setTimeout(() => {
      setLoad(false);
      setUserPC({});
      setUserName("");
      setGivePoints(false);
      navigate("/home");
    }, 15000);
  }

  const getPCpoints = async () => {
    if (Object.keys(userPC).length > 0) {
      if (givePoints && bonoselected === "9999") {
        setUserName(userPC?.name);
        if (!hasGivenPoints.current) {
          await setPoints();
          console.log("dando puntos");
          hasGivenPoints.current = true; 
        } else {
          console.log("Ya se han dado los puntos");
        }
      }
    }

    clearVariables();

  };



  useEffect(() => {
    getPCpoints();
  }, [userPC]);


  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="bg-green-500 p-5 rounded-3xl">
        <p className="text-4xl uppercase text-white ">
          {!givePoints
            ? "¡ Gracias por cuidar el planeta !"
            : "¡ Gracias por cuidar el planeta !"}
        </p>
      </div>
      {bonoselected === "9999" ? (
        <>
          {load && <Loading />}
          {givePoints ?  (
            <>
              <div className="flex items-center justify-between text-green-500 gap-5">
                <BsPersonCircle className="text-green-500 text-5xl" />
                <p className="uppercase text-4xl">{userName ? userName : ''}</p>
              </div>
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
          ) : null} </>) : (
        <div className="p-5 rounded-3xl w-full flex justify-center">
          <p className="text-green-500 text-4xl text-center">
            ¡ Tu bono ha sido creado, a tu celular llegaran los detalles para redimirlo !
          </p>
        </div>
      )}

    </div>
  );
};


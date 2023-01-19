import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { useStateContext } from "../context/ContextProvider";
import { useEffect, useState } from "react";
import { CardPoints } from "../components";
import { Spinner, Error } from "../ui";
import { Loading } from "../components/Loading";

export const Register = () => {
  const [call, setCall] = useState<boolean>(true);
  const navigate = useNavigate();
  setTimeout(() => {
    setCall(!call);
  }, 5000);
  const {
    customer,
    setCustomer,
    getPoints,
    dataPoints,
    setPoints,
    load,
    errorBD,
    idUser
  } = useStateContext();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userStorage = localStorage.getItem("userName");
    if (!userStorage) {
      navigate("/user");
      return;
    }
    const data = JSON.parse(userStorage);
    setCustomer(data.name);
  },[]);


  useEffect(() => {
    getPoints();
  }, [call]);
  const userName: any = customer?.split("_");

  const handleClick = async () => {
    await setPoints();
    navigate("/user/points");
  };

  if (errorBD) {
    return <Error />;
  }

  return (
    <div className="flex flex-col gap-10 justify-center text-center w-4/5  items-center">
      <p className="text-green-500 text-5xl">Paso 3: Ingresa tus Productos</p>
      <br/>
        <Loading/>
      <br/>
      <div className="flex items-center justify-between text-green-500 gap-5">
        <BsPersonCircle className="text-green-500 text-5xl" />
        <p className="uppercase text-5xl">{userName[0]}</p>
      </div>
      <div className="flex gap-5">
        {dataPoints?.map((data: any) => (
          <CardPoints
            count={data.count_view}
            name={data.name}
            img={data.url_icon}
            key={data?.id_product}
          />
        ))}
      </div>

      <p className="text-green-500 text-4xl">Objetos registrados</p>
      <button onClick={handleClick} type="button" className="btn-primary">
        {load ? <Spinner /> : <p>{idUser === "222222222" ? "Finalizar" : "Obtener Puntos"}</p>}
      </button>
    </div>
  );
};

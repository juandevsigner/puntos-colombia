import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { useStateContext } from "../context/ContextProvider";
import { useEffect, useState } from "react";
import { CardPoints } from "../components";
import { Spinner, Error } from "../ui";
import { Loading } from "../components/Loading";
import { handelRightClick } from '../components/AppUtility';

export const Register = () => {
  const { checktimerexpirity,Tare } = useStateContext();
  const [call, setCall] = useState<boolean>(true);
  const [ExpirityTime, setExpirityTime] = useState(0);
  document.removeEventListener('contextmenu', handelRightClick);

  const handleUserActivity = () => {

    if(ExpirityTime >= 1){
    localStorage.removeItem("expirytime");
    const now = new Date()
    const item = {
      expiry: now.getTime() + (5*60*1000),
    }
    localStorage.setItem("expirytime", JSON.stringify(item))
    //alert("click")
    }
    
  };

  const getPuntos = async () =>{
    await getPoints();
  }

  const navigate = useNavigate();
  setTimeout(() => {
    setCall(!call);
  }, 2500);
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
    document.addEventListener('contextmenu', handelRightClick);  

  },[]);

  useEffect(() => {
    document.addEventListener("click", handleUserActivity);

    return () => {
        document.removeEventListener("click", handleUserActivity);
    }
  }, [handleUserActivity]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setExpirityTime(ExpirityTime + 1);
      checktimerexpirity();
    }, 5000);
    return () => {
        clearTimeout(timeout);
    }
  }, [ExpirityTime]);


  useEffect(() => {
    getPuntos();
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
      <p className="text-green-500 text-7xl pb-20">Paso 3: Ingresa tus Productos</p>
      <div className="flex items-center justify-between text-green-500 gap-5">
        <BsPersonCircle className="text-green-500 text-5xl" />
        <p className="uppercase text-4xl">{userName[0]}</p>
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
        {load ? <Spinner /> : <p>{idUser === "222222222" ? "Continuar" : "Continuar"}</p>}
      </button>
    </div>
  );
};

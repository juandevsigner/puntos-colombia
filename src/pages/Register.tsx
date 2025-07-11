import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { useStateContext } from "../context/ContextProvider";
import { useEffect, useState } from "react";
import { CardPoints } from "../components";
import { Spinner, Error } from "../ui";
import { Loading } from "../components/Loading";
import { handelRightClick } from '../components/AppUtility';

import logo from '../assets/clothes-hanger.png'

export const Register = () => {
  const { checktimerexpirity } = useStateContext();
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
    }
    
  };

  const handleReturnHome = () => {
    navigate("/home");
  }

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
    idUser
  } = useStateContext();


  useEffect(() => {
    //const userStorage = localStorage.getItem("userName");
    /*if (!userStorage) {
      navigate("/user");
      return;
    }
    const data = JSON.parse(userStorage);
    setCustomer(data.name);*/
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
    //await setPoints();
    navigate("/user/giftselect");
  };

  return (
    <div className="flex flex-col gap-10 justify-center text-center w-4/5  items-center">
      <p className="text-green-500 text-7xl pb-20">Paso 3: Ingresa tus Productos</p>
      <div className="flex gap-5">
        {dataPoints.length > 0 ? 
          <CardPoints
            count={dataPoints[2]?.count_view}
            name={dataPoints[2]?.name}
            img={logo}
            key={dataPoints[2]?.id_product}
          /> : null  
        }
      </div>

      <p className="text-green-500 text-4xl">Objetos registrados</p>
      <button onClick={handleClick} type="button" className="btn-primary">
        {load ? <Spinner /> : <p>{idUser === "222222222" ? "Continuar" : "Continuar"}</p>}
      </button>
      <button
          className="my-3 btn-secondary justify-center text-3xl   items-center cursor-pointer transition-all"
          onClick={handleReturnHome}
        >
          <p>Volver al inicio</p>
        </button>
    </div>
  );
};

import { TiWarning } from "react-icons/ti";
import EcoShop from "../assets/ecoshopping.webp";
import { useStateContext } from "../context/ContextProvider";
import { Alert, Modal, ModalForm, Spinner } from "../ui";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { useEffect, useRef, useState } from "react";
import { Keypad } from "../components/Keypad";
import { useNavigate } from "react-router-dom";
import { handelRightClick } from '../components/AppUtility';


export const PhoneUser = () => {
  const { setPhoneUser, phoneUser, load, setMsg, msg, setLoad, checktimerexpirity, Tare } =
    useStateContext();
  const [isOpen, setIsOpen] = useState(true);
  const [ExpirityTime, setExpirityTime] = useState(0);
  const navigate = useNavigate();


  document.removeEventListener('contextmenu', handelRightClick);

  const handleUserActivity = () => {

    if(ExpirityTime >= 1){
    localStorage.removeItem("expirytime");
    const now = new Date()
    const item = {
      expiry: now.getTime() + (3*60*1000),
    }
    localStorage.setItem("expirytime", JSON.stringify(item))
    //alert("click")
    }
    
  };

  const handleClear = (e : any) => {
    e.preventDefault();
    setPhoneUser("");
  };

  const keyPulsed = (e: any) => {
    e.preventDefault();
    setPhoneUser(phoneUser + e.target.value);
  };

  const handleReturnHome = () => {
    navigate("/home");
  }

  const handleClick = async (e: any) => {
    //setIsOpen(false);
    e.preventDefault();

    if (phoneUser === "") {
      setMsg("Por favor ingrese un número de celular");
      setTimeout(() => {
        setMsg("");
        setLoad(false);
      }, 2000);
      return;
    }else if (phoneUser.length != 10){
      setMsg("Ingresa un número celular valido");
      setTimeout(() => {
        setMsg("");
        setLoad(false);
      }, 2000);
      return;
    }else{
      setMsg("");
      await Tare();
      navigate("/user/register");

    }

  };

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
      document.addEventListener('contextmenu', handelRightClick);  
      setPhoneUser("");
  },[]);

  return (
    <div className="flex flex-col text-center items-center justify-items-center transition-all w-full">
      {msg !== "" && <Alert msg={msg} />}
      <p className="text-green-500 text-7xl">Paso 2: Ingresa tu # celular</p>
      <form className="w-4/5">
        <input
          className="my-5  border-b border-green-600 w-full p-5 text-center text-3xl"
          type="number"
          value={phoneUser}
          //onFocus={()=>setIsOpen(true)}
        />
        {isOpen ?
                <>       
                <br/>
                <Keypad
                  onChange={(e:any) => keyPulsed(e)}
                  clear = {handleClear}
                /><br/></> : null}
        <button
          className="my-3 btn-primary justify-center text-3xl   items-center cursor-pointer transition-all"
          type="submit"
          onClick={handleClick}
        >
          {load ? <Spinner /> : <p>Continuar </p>}
        </button>
        <button
          className="my-3 btn-secondary justify-center text-3xl   items-center cursor-pointer transition-all"
          onClick={handleReturnHome}
        >
          <p>Volver al inicio</p>
        </button>
      </form>
      <img className="w-3/5" src={EcoShop} alt="ecoshopping" />

      <Modal />
      <ModalForm />
    </div>
  );
};

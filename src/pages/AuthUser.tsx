import { TiWarning } from "react-icons/ti";
import EcoShop from "../assets/ecoshopping.webp";
import { useStateContext } from "../context/ContextProvider";
import { Alert, Modal, ModalForm, Spinner } from "../ui";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { useState } from "react";
import { Keypad } from "../components/Keypad";

export const AuthUser = () => {
  const { setIdUser, idUser, load, setMsg, msg, authUser, Tare } =
    useStateContext();
  const [isOpen, setIsOpen] = useState(true);

  
  const handleClear = (e : any) => {
    //console.log(data.value)
    e.preventDefault();
    setIdUser("");
  };

  const keyPulsed = (e: any) => {

    e.preventDefault();
    console.log(e.target.value);
    setIdUser(idUser + e.target.value);
  };

  const handleClick = async (e: any) => {
    //setIsOpen(false);
    e.preventDefault();

    await Tare();
    if (idUser === "") {
      setMsg("Por favor ingrese un número de cedula");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      return;
    }
    if (idUser.length < 5) {
      setMsg("Ingresa un número valido");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      return;
    }

    await authUser(idUser);
  };

  return (
    <div className="flex flex-col text-center items-center justify-items-center transition-all w-full">
      {msg !== "" && <Alert msg={msg} />}
      <form className="w-4/5">
      <h2>Paso 2: Ingresa tu numero de cedula</h2>
        <input
          className="my-5  border-b border-green-600 w-full p-5 text-center text-3xl"
          placeholder="Ingrese su número de cedula"
          type="number"
          value={idUser}
          //onFocus={()=>setIsOpen(true)}
        />
        {isOpen ? <Keypad
          onChange={(e:any) => keyPulsed(e)}
          clear = {handleClear}
        /> : null}
        <button
          className="my-3 btn-primary justify-center text-3xl   items-center cursor-pointer transition-all"
          type="submit"
          onClick={handleClick}
        >
          {load ? <Spinner /> : <p>Comprobar </p>}
        </button>
      </form>
      <img className="w-3/5" src={EcoShop} alt="ecoshopping" />

      <Modal />
      <ModalForm />
    </div>
  );
};

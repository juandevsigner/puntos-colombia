import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Nature, Alert } from "../ui";
import EcoShop from "../assets/ecoshopping.webp";
import { TiWarning } from "react-icons/ti";
import axiosClient from "../config/axiosClient";
import { useStateContext } from "../context/ContextProvider";

export const AuthBussines = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { msg, setMsg, authBussiness } = useStateContext();

  const handleClick = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if ([name, password].includes("")) {
      setMsg("Todos los campos son obligatorios");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      return;
    }

    const userData = {
      user: name,
      pass: password,
      id_business: `${import.meta.env.VITE_id_business}`,
    };
    await authBussiness(userData);

    setName("");
    setPassword("");
  };

  return (
    <div className="h-screen  flex justify-center items-center">
      <div className="absolute top-0 left-0">
        <Nature />
      </div>
      <div className="flex flex-col items-center justify-items-center transition-all">
        {msg !== "" && <Alert msg={msg} />}
        <form>
          <input
            className="my-5  border-b border-green-600 w-full p-2 text-center text-xl placeholder:text-gray-300"
            placeholder="Nombre de Usuario"
            type="text"
            onChange={e => setName(e.target.value)}
            value={name}
          />
          <input
            className="my-5  border-b border-green-600 w-full p-2 text-center text-xl placeholder:text-gray-300"
            placeholder="Contraseña"
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <input
            type="submit"
            className="my-3 btn-primary justify-center items-center cursor-pointer"
            value="Comprobar"
            onClick={handleClick}
          />
        </form>
        <img className="w-72" src={EcoShop} alt="ecoshopping" />
      </div>
      <div className="absolute bottom-0 right-0 rotate-180">
        <Nature />
      </div>
    </div>
  );
};

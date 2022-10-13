import { TiWarning } from "react-icons/ti";
import EcoShop from "../assets/ecoshopping.webp";
import { useStateContext } from "../context/ContextProvider";
import { Modal, Spinner } from "../ui";

export const AuthUser = () => {
  const { setIdUser, idUser, load, setMsg, msg, authUser } = useStateContext();

  const handleClick = async (e: any) => {
    e.preventDefault();
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
    setIdUser("");
  };

  return (
    <div className="flex flex-col items-center justify-items-center transition-all">
      {msg !== "" && (
        <div className="bg-red-500 py-2 px-5 mb-3 flex gap-3 items-center">
          <TiWarning className="text-white text-xl" />
          <p className="text-white text-sm">{msg}</p>
          <TiWarning className="text-white text-xl" />
        </div>
      )}
      <form>
        <input
          className="my-5  border-b border-green-600 w-full p-2 text-center text-xl"
          placeholder="Ingrese su número de cedula"
          type="number"
          onChange={e => setIdUser(e.target.value)}
          value={idUser}
        />
        <button
          className="my-3 btn-primary justify-center items-center cursor-pointer transition-all"
          type="submit"
          onClick={handleClick}
        >
          {load ? <Spinner /> : <p>Comprobar</p>}
        </button>
      </form>
      <img className="w-72" src={EcoShop} alt="ecoshopping" />
      <Modal />
    </div>
  );
};

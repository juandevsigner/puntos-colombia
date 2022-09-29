import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

export const Register = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/user/points");
  };
  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <div className="flex items-center justify-between text-green-500 gap-5">
        <BsPersonCircle className="text-green-500 text-4xl" />
        <p className="uppercase text-4xl">juan alberto rios</p>
      </div>
      <p className="bg-green-500 py-8 px-14 rounded-full text-9xl text-white">
        0
      </p>
      <p className="text-green-500 text-3xl">Envases registrados</p>
      <button onClick={handleClick} type="button" className="btn-primary">
        Finalizar
      </button>
    </div>
  );
};

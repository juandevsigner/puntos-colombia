import { FaSadCry } from "react-icons/fa";
import { useStateContext } from "../context/ContextProvider";

export const Error = () => {
  const { msg } = useStateContext();
  return (
    <div className="flex flex-col justify-center items-center text-center w-4/5">
      <FaSadCry className="text-5xl mb-2 text-red-600" />
      <h1 className="text-5xl font-semibold text-red-600">¡Oh no!</h1>
      <p className="text-4xl">
        Hemos tenido problemas para registrar tus puntos
        {msg}
      </p>
    </div>
  );
};

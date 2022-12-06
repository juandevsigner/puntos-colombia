import { FaSadCry } from "react-icons/fa";
import { useStateContext } from "../context/ContextProvider";

export const Error = () => {
  const { msg } = useStateContext();
  return (
    <div className="flex flex-col justify-center items-center">
      <FaSadCry className="text-4xl text-red-600" />
      <h1 className="text-4xl font-semibold text-red-600">¡Oh no!</h1>
      <p className="text-xl">
        Hemos tenido problemas para registrar tus puntos
        {msg}
      </p>
    </div>
  );
};

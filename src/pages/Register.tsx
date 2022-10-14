import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { useStateContext } from "../context/ContextProvider";
import { useEffect } from "react";
import { CardPoints } from "../components";
import Icon from "../assets/t-shit-icon.png";
import { Spinner } from "../ui";

export const Register = () => {
  const navigate = useNavigate();
  const { customer, setCustomer, getPoints, dataPoints, setPoints, load } =
    useStateContext();

  useEffect(() => {
    const userStorage = localStorage.getItem("userName");
    if (!userStorage) {
      navigate("/user");
      return;
    }
    const data = JSON.parse(userStorage);
    setCustomer(data.name);
  }),
    [];

  useEffect(() => {
    getPoints();
  }, []);
  const userName: any = customer?.split("_");

  const handleClick = async () => {
    await setPoints();
    navigate("/user/points");
  };

  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <div className="flex items-center justify-between text-green-500 gap-5">
        <BsPersonCircle className="text-green-500 text-4xl" />
        <p className="uppercase text-4xl">{userName[0]}</p>
      </div>
      <div className="flex gap-5">
        {dataPoints?.map((data: any) => (
          <CardPoints
            count={data.count}
            name={data.name}
            img={Icon}
            key={data?.id_product}
          />
        ))}
      </div>

      <p className="text-green-500 text-3xl">Envases registrados</p>
      <button onClick={handleClick} type="button" className="btn-primary">
        {load ? <Spinner /> : <p>Finalizar</p>}
      </button>
    </div>
  );
};

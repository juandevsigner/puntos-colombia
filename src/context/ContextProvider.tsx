import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Provider, ValueProps } from "./Interfaces";
import axiosClient from "../config/axiosClient";
import { UserDate } from "./Interfaces";

const StateContext: React.Context<ValueProps> = createContext({} as ValueProps);

export const ContextProvider = ({ children }: Provider) => {
  const [idUser, setIdUser] = useState<string>("");
  const [customer, setCustomer] = useState<string | null>("");
  const [modal, setModal] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [dataPoints, setDataPoints] = useState<Array<any>>([]);
  const [pointsCol, setPointsCol] = useState<string>("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const configToken = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "id-business": `${import.meta.env.VITE_id_business}`,
    },
  };

  const authBussiness = async (dataUser: UserDate) => {
    setLoad(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosClient.post("/token", dataUser, config);
      const token = data.token;
      localStorage.setItem("token", JSON.stringify(token));
      navigate("/home");
    } catch (error: any) {
      setMsg(error.response.data.msg);
      setTimeout(() => {
        setMsg("");
      }, 3000);
    }
    setLoad(false);
  };

  const authUser = async (userId: string) => {
    setLoad(true);
    const userUid = {
      identification_number: userId,
      code_container: "ESECO08",
      documentType: 2,
    };

    try {
      const { data } = await axiosClient.post(
        "/customer/get_customer",
        userUid,
        configToken
      );
      const userInfo = {
        name: data.customer,
        id: data.identification_number,
        movi: data.movil,
      };
      localStorage.setItem("userName", JSON.stringify(userInfo));
      navigate("/user/register");
    } catch (error) {
      console.log(error);
      setModal(true);
    }
    setLoad(false);
  };

  const getPoints = async () => {
    try {
      const container = {
        code_container: `${import.meta.env.VITE_code_container}`,
      };
      const { data } = await axiosClient.post(
        "/container/sensor_simulate",
        container,
        configToken
      );
      setDataPoints(data);
    } catch (error) {}
  };

  const setPoints = async () => {
    setLoad(true);
    const user: any = localStorage.getItem("userName");
    const datosUser = JSON.parse(user);
    const userPointsData = {
      identification_number: datosUser.id,
      movil: datosUser.movi,
      code_container: `${import.meta.env.VITE_code_container}`,
      documentType: 2,
      generate_points: true,
      products: [
        {
          code: "RP-1",
          count: 700,
        },
        {
          code: "MOVIL-1",
          count: 5,
        },
        {
          code: "PILAS-1",
          count: 2,
        },
      ],
    };
    try {
      const { data } = await axiosClient.post(
        "/puntos-colombia/process_sale",
        userPointsData,
        configToken
      );
      setPointsCol(data.mainPoints);
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  return (
    <StateContext.Provider
      value={{
        idUser,
        setIdUser,
        modal,
        setModal,
        authBussiness,
        msg,
        setMsg,
        load,
        setLoad,
        authUser,
        customer,
        setCustomer,
        getPoints,
        dataPoints,
        setDataPoints,
        setPoints,
        pointsCol,
        setPointsCol,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

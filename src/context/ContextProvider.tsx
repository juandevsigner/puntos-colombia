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
    const userUid = {
      identification_number: userId,
    };

    try {
      const { data } = await axiosClient.post(
        "/customer/get_customer",
        userUid,
        configToken
      );
      console.log(import.meta.env.VITE_id_business);
      localStorage.setItem("userName", data.customer);
      navigate("/user/register");
    } catch (error) {
      console.log(error);
    }
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

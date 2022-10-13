import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Provider, ValueProps } from "./Interfaces";
import axiosClient from "../config/axiosClient";
import { UserDate } from "./Interfaces";

const StateContext: React.Context<ValueProps> = createContext({} as ValueProps);

export const ContextProvider = ({ children }: Provider) => {
  const [idUser, setIdUser] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
      return;
    }
  }, []);

  const authBussiness = async (dataUser: UserDate) => {
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
      return;
    } catch (error: any) {
      setMsg(error.response.data.msg);
      setTimeout(() => {
        setMsg("");
      }, 3000);
      return;
    }
  };

  return (
    <StateContext.Provider
      value={{ idUser, setIdUser, modal, setModal, authBussiness, msg, setMsg }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

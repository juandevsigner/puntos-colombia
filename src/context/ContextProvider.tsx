import { createContext, useContext, useState } from "react";
import { Provider, ValueProps } from "./Interfaces";

const StateContext: React.Context<ValueProps> = createContext({} as ValueProps);

export const ContextProvider = ({ children }: Provider) => {
  const [idUser, setIdUser] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  return (
    <StateContext.Provider value={{ idUser, setIdUser, modal, setModal }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

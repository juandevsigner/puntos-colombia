import { createContext, useContext, useState } from "react";
import { Provider, ValueProps } from "./Interfaces";

const StateContext: React.Context<ValueProps> = createContext({} as ValueProps);

export const ContextProvider = ({ children }: Provider) => {
  const [idUser, setIdUser] = useState<string>("");
  return (
    <StateContext.Provider value={{ idUser, setIdUser }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

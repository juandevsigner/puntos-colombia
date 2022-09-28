import { createContext, useContext, useState } from "react";
import { Provider, ValueProps } from "./Interfaces";

const StateContext: React.Context<ValueProps> = createContext({} as ValueProps);

export const ContextProvider = ({ children }: Provider) => {
  return <StateContext.Provider value={{}}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);

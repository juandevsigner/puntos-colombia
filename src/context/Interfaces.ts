export interface Provider {
  children: JSX.Element | JSX.Element[];
}

export interface ValueProps {
  idUser: string;
  setIdUser: React.Dispatch<React.SetStateAction<string>>;
}

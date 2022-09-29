export interface Provider {
  children: JSX.Element | JSX.Element[];
}

export interface ValueProps {
  idUser: string;
  setIdUser: React.Dispatch<React.SetStateAction<string>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

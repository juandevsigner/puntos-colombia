export interface Provider {
  children: JSX.Element | JSX.Element[];
}

export interface UserDate {
  user: string;
  pass: string;
  id_business: string;
}
export interface ValueProps {
  idUser: string;
  setIdUser: React.Dispatch<React.SetStateAction<string>>;
  customer: string | null;
  setCustomer: React.Dispatch<React.SetStateAction<string | null>>;
  msg: string;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
  load: boolean;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  authBussiness: (dataUser: UserDate) => Promise<void>;
  authUser: (user: string) => Promise<void>;
}

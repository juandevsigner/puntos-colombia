import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Publicity, Sidebar } from "../components";
import { useStateContext } from "../context/ContextProvider";

export const Home = () => {
  const {  setLoad } = useStateContext();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("userName");
    setLoad(false);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <div className="flex flex-col justify-between h-screen ">
      <br/>
      <br/>
      <Sidebar />
      <br />
      <Publicity />
      <b>Version: 1.0.1</b>
    </div>
  );
};

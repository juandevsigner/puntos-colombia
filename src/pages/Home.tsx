import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Publicity, Sidebar } from "../components";

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <div className="flex flex-col justify-between h-screen ">
      <Sidebar />
      <Publicity />
    </div>
  );
};

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const LayoutUI = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    console.log("token", token);
  }, []);

  return (
    <div className="h-screen w-full  flex justify-center items-center p-5">
      <Outlet />
    </div>
  );
};

export default LayoutUI;

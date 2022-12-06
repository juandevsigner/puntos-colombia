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
    console.log("token",token)
  }, []);

  return (
    <div className="h-screen  flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default LayoutUI;

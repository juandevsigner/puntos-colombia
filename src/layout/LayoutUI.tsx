import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Nature } from "../ui";

const LayoutUI = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <div className="h-screen  flex justify-center items-center">
      <div className="absolute top-0 left-0">
        <Nature />
      </div>
      <div className="absolute bottom-0 right-0 rotate-180">
        <Nature />
      </div>
      <Outlet />
    </div>
  );
};

export default LayoutUI;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextProvider } from "../context/ContextProvider";
import LayoutUI from "../layout/LayoutUI";
import { Home, Register, AuthUser, Points, AuthBussines } from "../pages";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route element={<AuthBussines />} path={"/"} />

          <Route element={<Home />} path="/home" />

          <Route path="/user" element={<LayoutUI />}>
            <Route element={<AuthUser />} index />
            <Route element={<Register />} path="register" />
            <Route element={<Points />} path="points" />
          </Route>
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
};

export default AllRoutes;

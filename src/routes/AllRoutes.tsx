import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextProvider } from "../context/ContextProvider";
import LayoutUI from "../layout/LayoutUI";
import { Home, Register, Auth, Points } from "../pages";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route element={<Home />} path="/" />

          <Route path="/user" element={<LayoutUI />}>
            <Route element={<Auth />} index />
            <Route element={<Register />} path="register" />
            <Route element={<Points />} path="points" />
          </Route>
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
};

export default AllRoutes;

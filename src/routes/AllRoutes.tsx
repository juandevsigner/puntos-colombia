import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextProvider } from "../context/ContextProvider";
import LayoutUI from "../layout/LayoutUI";
import { Home, Register, AuthUser, Points, AuthBussines } from "../pages";
import { PhoneUser } from "../pages/PhoneUser";
import { GiftSelect } from "../pages/GiftSelect";
import { ErrorPage } from "../pages/ErrorPage";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route element={<AuthBussines />} path={"/"} />
          <Route element={<Home />} path="/home" />
          <Route element={<Home />} path="/home" />
          <Route path="/user" element={<LayoutUI />}>
            <Route element={<PhoneUser />} path="phone" />
            <Route element={<AuthUser />} index />
            <Route element={<Register />} path="register" />
            <Route element={<GiftSelect />} path="giftselect" />
            <Route element={<Points />} path="points" />
          </Route>
          <Route element={<ErrorPage />} path="/error" />
          <Route path="*" element={<Home />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
};

export default AllRoutes;

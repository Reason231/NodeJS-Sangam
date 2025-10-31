import { BrowserRouter, Route, Routes, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { RegisterPage } from "./pages/Register";
import { LoginPage } from "./pages/Login";
import { AppLayout } from "./Layout/AppLayout";
import { UserHome } from "./pages/UserHome";
import { CheckAuth } from "./routes/CheckAuth";
import { NotFound } from "./pages/NotFound";
import { ChangePassword } from "./pages/ChangePassword";
import { AdminHome } from "./pages/AdminHome";
import { UnauthPage } from "./pages/UnauthPage";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {

  const location=useLocation()

    const {token,user,isAuthenticated,isLoading}=useSelector(state => state.auth)

    if(isLoading) return <>Loading....</>
  return (
    <>
        <Routes>
          <Route path="/auth" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} token={token}>
              <AppLayout />
              </CheckAuth>
            }>
            <Route path="register" element={<RegisterPage />}></Route>
            <Route path="login" element={<LoginPage />}></Route>
            <Route path="change-password" element={<ChangePassword />}></Route>
          </Route>

          <Route
            path="/api/user"
            element={
              <CheckAuth token={token} user={user} isAuthenticated={isAuthenticated}>
                <AppLayout />
              </CheckAuth>
            }
          >
            <Route path="home" element={<UserHome />}></Route>
          </Route>

          <Route path="/api/admin"
          element={
            <CheckAuth token={token} user={user} isAuthenticated={isAuthenticated}>
              <AppLayout/>
            </CheckAuth>
          }>
            <Route path="home" element={<AdminHome />}></Route>
          </Route>
          
          
        <Route path="/unauth-page" element={<UnauthPage />}></Route>

        <Route path="*" element={<NotFound />}></Route>
        </Routes>

    </>
  );
}

export default App;

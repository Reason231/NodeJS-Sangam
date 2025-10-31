import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
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

function App() {

  const location=useLocation()

    // ✅ use state so React can re-render when these change
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated")
  );

  // ✅ Runs once at mount AND whenever the route changes
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
    setIsAuthenticated(localStorage.getItem("isAuthenticated"));
  }, [location]); // runs whenever the route changes

  

  return (
    <>
        <Routes>
          <Route path="/auth" element={
            <CheckAuth isAuthenticated={isAuthenticated} role={role} token={token}>
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
              <CheckAuth token={token} role={role} isAuthenticated={isAuthenticated}>
                <AppLayout />
              </CheckAuth>
            }
          >
            <Route path="home" element={<UserHome />}></Route>
          </Route>

          <Route path="/api/admin"
          element={
            <CheckAuth token={token} role={role} isAuthenticated={isAuthenticated}>
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

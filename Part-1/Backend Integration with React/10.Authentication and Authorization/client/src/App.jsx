import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { RegisterPage } from "./pages/Register";
import { LoginPage } from "./pages/Login";
import { AppLayout } from "./Layout/AppLayout";
import { UserHome } from "./pages/UserHome";
import { CheckAuth } from "./routes/CheckAuth";
import { NotFound } from "./pages/NotFound";
import { ChangePassword } from "./pages/ChangePassword";
import { AdminHome } from "./pages/AdminHome";
import { UnauthPage } from "./pages/UnauthPage";

function App() {
  // const navigate=useNavigate()

    let token;
  let role;
  let isAuthenticated;

  // useEffect(()=>{
  // let token;
  // let role;
  // let isAuthenticated;

  // },[navigate])

  return (
    <>
      <BrowserRouter>
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

      </BrowserRouter>
    </>
  );
}

export default App;

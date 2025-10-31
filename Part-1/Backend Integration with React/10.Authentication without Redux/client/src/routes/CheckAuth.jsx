import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Children } from "react";

export const CheckAuth = ({token,role,isAuthenticated,children}) => {
  const location = useLocation();




  if(!isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("/register"))){
    return <Navigate to={"/auth/login"}></Navigate>
  }

  if(isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))){
    if(role === "admin"){
      alert("You are already logged in so you are navigated to your home page")
      return <Navigate to="/api/admin/home"></Navigate>
    }
    else{
      alert("You are already logged in so you are navigated to your home page")
      return <Navigate to="/api/user/home"></Navigate>
    }
  }


  if(isAuthenticated && role !== "admin" && location.pathname.includes("admin")){
    return <Navigate to="/unauth-page"></Navigate>
  }

  if(isAuthenticated && role === "admin" && location.pathname.includes("user")){
    return <Navigate to="/api/admin/home"></Navigate>
  }

    try {
    if (token) {
      // When the user refresh this page, the token time is checked so that it will still remain in the same page without logging it again
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 <= Date.now()) {
        // token expired
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated")
        localStorage.removeItem("role")
        alert("Session expired. Please log in again.");
        return <Navigate to="/auth/login" replace />;
      }
    }
    return <>{children}</>
  } catch (e) {
    console.error(e);
    // When the token expires and the user target this endpoint, two things happen:
    // The next API request with that expired token will fail with a 401 Unauthorized (because jwt.verify() throws an error from backend).
    // Your React app can catch that and automatically log the user out:
    if (e.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated")
      localStorage.removeItem("role")
      navigate("/auth/login");
    }
  }

}


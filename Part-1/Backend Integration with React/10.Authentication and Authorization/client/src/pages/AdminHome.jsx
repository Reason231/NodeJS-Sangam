import { useEffect } from "react";
import api from "../utils/axios";
import { useOutletContext } from "react-router-dom";


export const AdminHome = () => {
  // Gets the token from "CheckAuth.jsx -> App.jsx -> UserHome.jsx"
    
  const fetchUser = async () => {
    try {
      const response = await api.get("/admin/home", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <>Welcome to the home page of admin</>;
};

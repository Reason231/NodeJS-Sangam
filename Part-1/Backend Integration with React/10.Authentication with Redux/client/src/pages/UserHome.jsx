import { useEffect } from "react";
import api from "../utils/axios";
import { useOutletContext } from "react-router-dom";


export const UserHome = ({token}) => {

  const fetchUser = async () => {
    try {
      const response = await api.get("/user/home", {
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

  return <>Welcome to the home page of user</>;
};

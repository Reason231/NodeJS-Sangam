import axios from "axios";
import { useRef } from "react";
import api from "../utils/axios";
import { Button } from "@/components/UI/button";

export const ChangePassword = () => {
  const oldPassword = useRef("");
  const newPassword = useRef("");

  const handleChangePassword = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/change-password",
        {
          oldPassword: oldPassword.current.value,
          newPassword: newPassword.current.value,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      alert(response.data.message)
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <form onSubmit={handleChangePassword}>
        <div>
          <label for="oldPassword">Old Password</label>
          <input
            type="text"
            id="oldPassword"
            ref={oldPassword}
            className="border-2"
          />
        </div>

        <div>
          <label for="newPassword">New Password</label>
          <input
            type="text"
            id="newPassword"
            ref={newPassword}
            className="border-2"
          />
        </div>

        <Button type="submit" className="border">
          Change Password
        </Button>
      </form>
    </>
  );
};

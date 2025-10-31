import axios from "axios";
import { useRef } from "react";
import api from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../store/auth-slice";

export const ChangePassword = () => {
  const oldPassword = useRef("");
  const newPassword = useRef("");
  const dispatch=useDispatch()

  const handleChangePassword = async (e) => {
    e.preventDefault()

    try {
      const formData={oldPassword:oldPassword.current.value,newPassword:newPassword.current.value}

      const result=await dispatch(changePassword(formData))
    
      if(result.type == "/auth/change-password/fulfilled"){
        console.log(result.payload.message)
      } else if(result.type == "/auth/change-password/rejected"){
        console.log(result.payload.message || "Error changing password")
      }
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

        <button type="submit" className="border">
          Change Password
        </button>
      </form>
    </>
  );
};

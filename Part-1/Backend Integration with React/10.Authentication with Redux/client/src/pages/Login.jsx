import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/auth-slice";

export const LoginPage = () => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        email: email.current.value,
        password: password.current.value,
      };

      const result = await dispatch(loginUser(formData));

      if (result.type === "/auth/login/fulfilled") {
        console.log("Login successful", result);
      } else if (result.type === "/auth/login/rejected") {
        console.log("Login error", result.payload.message || "Login failed");
      }

      // Store the token
      if (result.payload.token) {
        // Redirect to home page or dashboard
        navigate("/api/user/home");
      }
    } catch (e) {
      console.log("Error while logging", e);
      // Handle error (show to user)
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label for="email">Email: </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            ref={email}
            className="border-2"
          />
        </div>
        <div>
          <label for="password">Password: </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            ref={password}
            className="border-2"
          />
        </div>

        <button type="submit" className="border">
          Login
        </button>
      </form>
    </>
  );
};

import React from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const Login = () => {
  const [email, setEmail] = useState("sai@gmail.com");
  const [password, setPassword] = useState("Sai@1234");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const result = await axios.post(
       BASE_URL+ "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      ); // Add withCredentials to the request
      dispatch(addUser(result.data));
       navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error?.response?.data?.message || "Invalid email or password. Please try again.");
    }
  };
  return (
    <div className="flex justify-center my-12">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="text-center font-bold text-lg pt-6">Login</legend>
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-800 dark:text-red-400">{error}</p>
        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};
export default Login;

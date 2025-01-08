

import { createContext, useContext, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import apiRequest from "../api/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/user");
      setUser(data);
    } catch (error) {
      console.error("Unable to fetch user:", error);
    }
  };

 
  const login = async ({ email, password }) => {
    if (!email || !password) {
      setErrors("Email and password are required.");
      return;
    }
    setErrors(null);
    setLoading(true);

    try {
      const response = await apiRequest("login", "POST", { email, password });
      if (response.token) {
        localStorage.setItem("authToken", response.token);
        navigate("/dashboard");
      }
    } catch (error) {
      setErrors(error.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };


  const forgetPassword = async (email) => {
    setErrors(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      const response = await apiRequest(
        "forgot-password",
        "POST",
        { email },
        token
      );

      console.log("API Response:", response); // Corrected to log the actual response

      if (response?.status) {
        console.log("Returning success message:", response.status);
        setErrors(null); // Clear any previous errors
        return response.status; // Use response.status directly
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error in forgetPassword:", error.message);
  
      setErrors(error.message || "Something went wrong. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearErrors = () => setErrors(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        errors,
        clearErrors,
        loading,
        getUser,
        forgetPassword,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export default function useAuthContext() {
  return useContext(AuthContext);
}

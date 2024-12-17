import { createContext, useContext, useEffect,useState } from "react";
import axios from "../api/axios";
import {useNavigate} from "react-router-dom";
import apiRequest from "../api/axios";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] =useState(null);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    
    const getUser = async () => {
        const {data} = await axios.get('/api/user');
        setUser(data);
    }

    const login = async ({ email, password }) => {
        if (!email || !password) {
            setErrors("Email and password are required.");
            return;
        }
        setErrors(null);
        setLoading(true);
       
         try {
                const response = await apiRequest("login","POST", {email, password});
                if (response.token) {
                  localStorage.setItem("authToken",response.token);
                    navigate("/dashboard");
                }
            } catch (errors) {
                    setErrors( "Invalid email or password.");
            } finally {
                setLoading(false);
            }
    };
  
  const forgetPassword = async (email) => {
    setErrors(null);
    setLoading(true);
    // await csrf(); // Ensure CSRF cookie is set
    try {
      const token = localStorage.getItem("authToken")
      const response = await apiRequest("forgot-password", "POST", { email }, token);
      if(response.status===200){
        return response.data.status || "Password reset link sent! Check your email.";
      }

    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.message || "Invalid email address.");
      } else {
        setErrors("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
    const clearErrors = () => setErrors(null);
    return <AuthContext.Provider value={{user,errors,clearErrors, loading, getUser,forgetPassword, login}}>
        {children}
    </AuthContext.Provider>
}
export default function useAuthContext(){
    return useContext(AuthContext);
}
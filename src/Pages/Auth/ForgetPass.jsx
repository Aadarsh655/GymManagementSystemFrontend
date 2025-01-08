import { useState } from "react";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Logo from "../../components/UI/Logo";
import useAuthContext from "../../context/AuthContext";
import ErrorAlert from "../../layouts/Error";

export default function forgetPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const { forgetPassword, errors, clearErrors, loading } = useAuthContext(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    setStatus(null);

    const message = await forgetPassword(email); 
    if (message) {
      console.log("Setting status to:", message);
      setStatus(message); 
    }
    else{
      console.log("No message returned; something went wrong.");
    }
  };

  return (
    <div className="flex min-h-screen bg-secondary flex-col">
   
      <div className="p-9">
        <Logo />
      </div>

    
      <div className="m-auto w-full max-w-md space-y-8 rounded-xl bg-white p-8">
        
        <p className="text-gray-600 text-center mb-6">
          Forgot your password? No problem. Just let us know your email address,
          and we will email you a password reset link that will allow you to
          choose a new one.
        </p>
       
        {status && <ErrorAlert className="bg-green-100 text-green-700 border-green-300" message={status} onClose={clearErrors} />}
        {errors && <ErrorAlert message={errors} onClose={clearErrors} />}
      

       
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-600">
              Email
            </label>
            <Input
              className="bg-white w-full"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            label={loading ? "Processing..." : "EMAIL PASSWORD RESET LINK"} 
            className={`w-full ${loading ? "bg-gray-400" : "bg-primary-500 hover:bg-primary-700"}`}
            disabled={loading} 
          />
        </form>
      </div>
    </div>
  );
}

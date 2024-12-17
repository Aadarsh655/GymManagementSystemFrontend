import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import useAuthContext from "../../context/AuthContext";
import Button from "../../components/UI/Button";
import Checkbox from "../../components/UI/Checkbox";
import Input from "../../components/UI/Input";
import Label from "../../components/UI/InputLabel";
import ErrorAlert from "../../layouts/Error";
import Logo from "../../components/UI/Logo";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, errors, loading, clearErrors } = useAuthContext();

  // Clear errors when the user types
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (errors) clearErrors();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  const handleForgotPassword = () => navigate("/forgot-password");

  return (
    <div className="flex min-h-screen bg-secondary flex-col">
      {/* Logo */}
      <div className="p-9">
        <Logo />
      </div>

      {/* Login Form */}
      <div className="m-auto w-full max-w-md space-y-8 rounded-xl bg-white p-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-600">
            Enter your existing account details below
          </p>
        </motion.div>

        {/* Error Alert */}
        {errors && <ErrorAlert message={errors} onClose={clearErrors} />}

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={handleInputChange(setEmail)} // Handles input change and clears errors
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="bg-gray-50"
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleInputChange(setPassword)} // Handles input change and clears errors
                className="bg-gray-50 pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary-700 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={loading} // Disable button when loading
            label={loading ? "Logging In..." : "LOG IN"} // Change text based on loading state
          />
        </motion.form>
      </div>
    </div>
  );
}

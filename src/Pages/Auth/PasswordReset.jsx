import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Logo from '../../components/UI/Logo';
import apiRequest from '@/api/axios';

export default function PasswordReset() {
  const [searchParams] = useSearchParams(); // Get query parameters
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Extract email and token from URL
    const emailFromParams = searchParams.get('email');
    const tokenFromParams = searchParams.get('token');
    console.log("token:", token);

    if (emailFromParams && tokenFromParams) {
      setEmail(emailFromParams);
      setToken(tokenFromParams);
    } else {
      setError('Invalid or missing reset token or email.');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password confirmation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Send password reset request to backend
      const response = await apiRequest('reset-password', 'POST', {
        email,
        password,
        password_confirmation: confirmPassword,
        token,
      });

      // Handle success response
      if (response.status === 200) {
        setSuccess(true);
        setError('');
      } else {
        setError(response.data?.message || 'Failed to reset password.');
      }
    } catch (err) {
      // Handle error response
      console.error('Error:', err.response);
      setError(err.response?.data?.message || 'An error occurred while resetting the password.');
    }
  };

  return (
    <div className="flex min-h-screen bg-secondary flex-col">
      <div className="p-9">
        <Logo />
      </div>
      <div className="m-auto w-full max-w-md space-y-8 rounded-xl bg-white p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Reset Password
        </h2>
        {success ? (
          <p className="text-green-500 text-center">Your password has been reset successfully!</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                required
                className="bg-gray-50"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled // Make email non-editable
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <Input
                id="password"
                type="password"
                required
                className="bg-gray-50"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                required
                className="bg-gray-50"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <Button type="submit" label="RESET PASSWORD" className="w-full" />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

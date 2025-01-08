import React, { useState } from 'react';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Logo from '../../components/UI/Logo';
export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
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
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <Button
              type="submit"
              label= "RESET PASSWORD"
              className="w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
}


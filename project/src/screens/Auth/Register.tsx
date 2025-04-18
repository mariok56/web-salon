import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import { useAuthStore } from '../../store/authStore';

export const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    // In a real app, you'd create a user account with your API here
    // For now, we'll just simulate a successful registration
    login({ name, email }); // Store user data
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-[url(/register-bg.jpg)] bg-cover bg-center">
      <div className="min-h-screen bg-black/80 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900 border border-gray-800 p-8">
          <div className="flex justify-center mb-6">
            <Link to="/" className="flex items-center">
              <img className="w-[52px] h-9" alt="Logo" src="/logo.svg" />
              <img
                className="w-[51px] h-[16px] ml-1.5"
                alt="Saloon"
                src="/saloon.svg"
              />
            </Link>
          </div>
          
          <h2 className="text-2xl font-bold text-white text-center mb-6">Create an Account</h2>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white focus:ring-[#fbb034] focus:border-[#fbb034] outline-none"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white focus:ring-[#fbb034] focus:border-[#fbb034] outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white focus:ring-[#fbb034] focus:border-[#fbb034] outline-none"
                placeholder="Create a password"
                required
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordError('');
                }}
                className={`w-full p-3 bg-gray-800 border ${
                  passwordError ? 'border-red-500' : 'border-gray-700'
                } text-white focus:ring-[#fbb034] focus:border-[#fbb034] outline-none`}
                placeholder="Confirm your password"
                required
              />
              {passwordError && (
                <p className="mt-1 text-sm text-red-500">{passwordError}</p>
              )}
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-[#fbb034] focus:ring-[#fbb034] bg-gray-800 border-gray-700"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                I agree to the{' '}
                <a href="#" className="text-[#fbb034] hover:text-[#fbb034]/90">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#fbb034] hover:text-[#fbb034]/90">
                  Privacy Policy
                </a>
              </label>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-[#fbb034] hover:bg-[#fbb034]/90 text-black font-bold py-3 rounded-none"
            >
              Create Account
            </Button>
            
            <p className="text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-[#fbb034] hover:text-[#fbb034]/90 font-medium">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
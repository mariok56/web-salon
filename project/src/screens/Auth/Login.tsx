import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "../../components/ui/button";

interface LoginProps {
  onLogin: () => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center">
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
          
          <h2 className="text-2xl font-bold text-white text-center mb-6">Welcome Back</h2>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white focus:ring-[#fbb034] focus:border-[#fbb034] outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#fbb034] focus:ring-[#fbb034] bg-gray-800 border-gray-700"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-[#fbb034] hover:text-[#fbb034]/90">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-[#fbb034] hover:bg-[#fbb034]/90 text-black font-bold py-3 rounded-none"
            >
              Sign In
            </Button>
            
            <p className="text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#fbb034] hover:text-[#fbb034]/90 font-medium">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

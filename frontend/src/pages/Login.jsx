import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';
import React from 'react';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/auth/login`, { email, password });
      login(res.data.token, res.data.user);
      navigate(res.data.user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="glass-panel p-8 w-full max-w-md rounded-2xl">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-500/10 rounded-full mb-4">
            <LogIn size={32} className="text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold dark:text-white text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Sign in to continue to IdeaPortal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Email</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              className="input-modern mt-1"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="input-modern mt-1"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button className="btn-gradient w-full mt-4">Sign In</button>
        </form>
        
        <p className="text-center mt-6 text-sm text-slate-500">
          Don't have an account? <Link to="/register" className="text-blue-500 font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
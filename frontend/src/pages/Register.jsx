import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';
import React from 'react';


export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/auth/register`, formData);
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Error registering');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="glass-panel p-8 w-full max-w-md rounded-2xl">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-purple-500/10 rounded-full mb-4">
            <UserPlus size={32} className="text-purple-500" />
          </div>
          <h2 className="text-3xl font-bold dark:text-white text-slate-900">Create Account</h2>
          <p className="text-slate-500 mt-2">Join the community and share ideas</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              className="input-modern mt-1"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Email</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              className="input-modern mt-1"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="input-modern mt-1"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button className="btn-gradient w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-600">Register</button>
        </form>
        
        <p className="text-center mt-6 text-sm text-slate-500">
          Already have an account? <Link to="/login" className="text-blue-500 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
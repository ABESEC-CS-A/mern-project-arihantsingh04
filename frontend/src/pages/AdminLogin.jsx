import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch (err) { alert('Invalid Credentials'); }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="glass-card p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" className="input-field" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="input-field" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="btn-primary w-full">Login</button>
        </form>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import IdeaCard from '../components/IdeaCard';
import React from 'react';

export default function AdminDashboard() {
  const [ideas, setIdeas] = useState([]);
  const navigate = useNavigate();

  const fetchIdeas = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE}/ideas`);
    setIdeas(res.data);
  };
  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/admin/login');
    else fetchIdeas();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="space-y-4">
        {ideas.map(idea => <IdeaCard key={idea._id} idea={idea} refreshIdeas={fetchIdeas} isAdmin={true} />)}
      </div>
    </div>
  );
}

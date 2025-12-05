import { useState } from 'react';
import axios from 'axios';
import { Send, Sparkles } from 'lucide-react';
import React from 'react';


export default function IdeaForm({ onIdeaSubmitted }) {
  const [formData, setFormData] = useState({ title: '', description: '', category: 'General', tags: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE}/ideas`, formData);
      setFormData({ title: '', description: '', category: 'General', tags: '' });
      onIdeaSubmitted();
    } catch (err) {
      alert('Error submitting idea');
    }
    setLoading(false);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
      {}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>

      <div className="flex items-center gap-2 mb-6 relative z-10">
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
          <Sparkles size={20} />
        </div>
        <h2 className="text-xl font-bold dark:text-white text-slate-800">New Idea</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Title</label>
          <input 
            placeholder="e.g. Dark Mode for Dashboard" 
            className="input-modern mt-1" 
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Description</label>
          <textarea 
            placeholder="Describe your idea in detail..." 
            className="input-modern h-32 mt-1 resize-none" 
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Category</label>
            <select 
              className="input-modern mt-1 appearance-none cursor-pointer"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option>General</option>
              <option>Education</option>
              <option>Community</option>
              <option>Sustainability</option>
              <option>Tech</option>
            </select>
          </div>
          
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Tags</label>
            <input 
              placeholder="ui, ux, feature" 
              className="input-modern mt-1" 
              value={formData.tags}
              onChange={e => setFormData({...formData, tags: e.target.value})}
            />
          </div>
        </div>

        <button disabled={loading} className="btn-gradient w-full flex justify-center items-center gap-2 mt-2">
          {loading ? 'Submitting...' : <><Send size={18} /> Submit Idea</>}
        </button>
      </form>
    </div>
  );
}
import React, { useState } from 'react';
import axios from 'axios';
import { ThumbsUp, ThumbsDown, MessageCircle, Trash2, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const statusStyles = {
  'Submitted': 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
  'In Review': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  'Approved': 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  'Rejected': 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
};

export default function IdeaCard({ idea, refreshIdeas, isAdmin }) {
  const [showComments, setShowComments] = useState(false);
  const [commentBody, setCommentBody] = useState('');
  const { user } = useAuth(); 

  const handleVote = async (type) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE}/ideas/${idea._id}/vote`, { voteType: type });
      refreshIdeas();
    } catch (err) {
      alert(err.response?.data?.message || 'Error voting');
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentBody.trim()) return;

   try {
     await axios.post(`${import.meta.env.VITE_API_BASE}/ideas/${idea._id}/comments`, { 
        body: commentBody,
        author: user ? user.name : "Anonymous" 
      });
      setCommentBody('');
      refreshIdeas();
    } catch (err) {
      console.error(err);
      alert("Failed to post comment.");
    }
  };

  const deleteIdea = async () => {
    if (!confirm('Delete this idea?')) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE}/ideas/${idea._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      refreshIdeas();
    } catch (err) {
      alert("Failed to delete idea.");
    }
  };

  const updateStatus = async (status) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(`${import.meta.env.VITE_API_BASE}/ideas/${idea._id}/status`, 
        { status }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      refreshIdeas();
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl group hover:-translate-y-1 transition-transform duration-300">
      <div className="flex gap-4">
        {}
        <div className="flex flex-col items-center bg-slate-100 dark:bg-neutral-900 rounded-xl p-2 h-fit border border-slate-200 dark:border-white/5">
          <button onClick={() => handleVote('up')} className="p-1 hover:text-green-500 text-slate-400 transition-colors">
            <ThumbsUp size={20} />
          </button>
          <span className={`font-bold my-1 text-lg ${idea.votes > 0 ? 'text-green-500' : 'text-slate-500'}`}>
            {idea.votes}
          </span>
          <button onClick={() => handleVote('down')} className="p-1 hover:text-red-500 text-slate-400 transition-colors">
            <ThumbsDown size={20} />
          </button>
        </div>

        {}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusStyles[idea.status]}`}>
              {idea.status}
            </span>
            <span className="text-xs text-slate-400">{new Date(idea.createdAt).toLocaleDateString()}</span>
          </div>

          <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-2 leading-tight">{idea.title}</h3>
          <p className="dark:text-slate-400 text-slate-600 text-sm leading-relaxed">{idea.description}</p>
          
          {}
          <div className="flex flex-wrap gap-2 mt-4">
            {idea.tags.map(tag => (
              tag && <span key={tag} className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md bg-slate-100 dark:bg-neutral-900 text-slate-500 dark:text-slate-400">
                <Tag size={12} /> {tag}
              </span>
            ))}
          </div>

          {}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200 dark:border-white/5">
            <button 
              onClick={() => setShowComments(!showComments)} 
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-500 transition-colors"
            >
              <MessageCircle size={18} /> 
              {idea.comments.length} Comments
              {showComments ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
            </button>
            
            {isAdmin && (
              <div className="flex items-center gap-3">
                <select 
                  className="bg-slate-100 dark:bg-neutral-900 text-xs rounded-lg p-2 border-none outline-none cursor-pointer dark:text-white"
                  value={idea.status}
                  onChange={(e) => updateStatus(e.target.value)}
                >
                  <option>Submitted</option>
                  <option>In Review</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
                <button onClick={deleteIdea} className="text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showComments ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <div className="bg-slate-50 dark:bg-neutral-900/50 rounded-xl p-4 border border-slate-200 dark:border-white/5">
          <form onSubmit={submitComment} className="flex gap-2 mb-4">
            <input 
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder={user ? "Join the discussion..." : "Login to comment..."}
              className="input-modern py-2 text-sm bg-white dark:bg-neutral-900"
              disabled={!user} 
            />
            <button 
              disabled={!user}
              className="px-4 py-2 bg-slate-200 dark:bg-neutral-800 rounded-lg text-sm font-semibold hover:bg-blue-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </form>
          
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {idea.comments.length === 0 && <p className="text-center text-xs text-slate-400 py-2">No comments yet.</p>}
            {idea.comments.slice().reverse().map((c) => (
              <div key={c._id} className="text-sm p-3 rounded-lg bg-white dark:bg-neutral-900 shadow-sm border border-slate-100 dark:border-white/5">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-blue-500 text-xs">{c.author}</span>
                  <span className="text-slate-400 text-[10px]">{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="dark:text-slate-300 text-slate-700">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
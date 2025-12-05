import { useEffect, useState, useLayoutEffect, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import IdeaForm from '../components/IdeaForm';
import IdeaCard from '../components/IdeaCard';
import { Search, Filter, TrendingUp } from 'lucide-react';
import React from 'react';


export default function Home() {
  const [ideas, setIdeas] = useState([]);
  const [filters, setFilters] = useState({ category: '', search: '', sort: 'newest' });
  
  // GSAP Refs
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const listRef = useRef(null);

  const fetchIdeas = async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await axios.get(`${import.meta.env.VITE_API_BASE}/ideas?${query}`);
    setIdeas(res.data);
  };

  useEffect(() => { fetchIdeas(); }, [filters]);

  // GSAP Intro Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 30, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out"
      });
      gsap.from(formRef.current, {
        x: -50, opacity: 0, duration: 1, delay: 0.5, ease: "power3.out"
      });
      gsap.from(listRef.current, {
        x: 50, opacity: 0, duration: 1, delay: 0.5, ease: "power3.out"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div ref={headerRef} className="text-center py-12 mb-10 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -z-10 animate-blob"></div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight dark:text-white text-slate-900">
          Share Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Brilliance</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Vote on the features you want to see next. Join the community and shape the future.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left: Sticky Form */}
        <div ref={formRef} className="lg:col-span-4">
          <div className="sticky top-24">
            <IdeaForm onIdeaSubmitted={fetchIdeas} />
          </div>
        </div>

        {/* Right: Ideas List */}
        <div ref={listRef} className="lg:col-span-8 space-y-6">
          {/* Modern Filter Bar */}
          <div className="glass-panel p-4 rounded-2xl flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center bg-slate-100 dark:bg-slate-900/50 rounded-xl px-4 py-2 flex-1 border border-slate-200 dark:border-white/5 transition-colors">
              <Search size={20} className="text-slate-400 mr-2" />
              <input 
                className="bg-transparent border-none focus:ring-0 w-full outline-none dark:text-white text-slate-800 placeholder-slate-400"
                placeholder="Search ideas..."
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>
            
            <div className="flex gap-2">
              <div className="relative group">
                <select 
                  className="appearance-none bg-slate-100 dark:bg-slate-900/50 dark:text-white text-slate-700 px-4 py-2 pl-10 rounded-xl border border-slate-200 dark:border-white/5 outline-none cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="">All Categories</option>
                  <option>General</option>
                  <option>Tech</option>
                  <option>Education</option>
                </select>
                <Filter className="absolute left-3 top-2.5 text-slate-400" size={16} />
              </div>

              <div className="relative group">
                <select 
                  className="appearance-none bg-slate-100 dark:bg-slate-900/50 dark:text-white text-slate-700 px-4 py-2 pl-10 rounded-xl border border-slate-200 dark:border-white/5 outline-none cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  onChange={(e) => setFilters({...filters, sort: e.target.value})}
                >
                  <option value="newest">Newest</option>
                  <option value="votes">Top Voted</option>
                </select>
                <TrendingUp className="absolute left-3 top-2.5 text-slate-400" size={16} />
              </div>
            </div>
          </div>

          {/* Ideas Grid */}
          <div className="space-y-4">
            {ideas.map(idea => (
              <IdeaCard key={idea._id} idea={idea} refreshIdeas={fetchIdeas} isAdmin={false} />
            ))}
            {ideas.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">No ideas found. Be the first to submit one!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
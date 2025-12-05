import { Link, useNavigate } from 'react-router-dom';
import { Lightbulb, LogOut, Moon, Sun, LayoutDashboard, User, LogIn } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import React from 'react';


export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10 dark:bg-slate-900/80 bg-white/80 transition-colors duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
            <Lightbulb className="text-white" size={20} />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            IdeaPortal
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
          </button>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium dark:text-slate-300 text-slate-600 hidden md:block">
                Hi, {user.name}
              </span>
              
              {user.role === 'admin' && (
                <Link to="/admin" className="flex items-center gap-2 text-sm font-medium hover:text-blue-500 transition-colors px-3 py-1.5 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                  <LayoutDashboard size={18} /> Panel
                </Link>
              )}
              
              <button onClick={handleLogout} className="flex items-center gap-1 text-red-500 hover:text-red-400 font-medium text-sm">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/30">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
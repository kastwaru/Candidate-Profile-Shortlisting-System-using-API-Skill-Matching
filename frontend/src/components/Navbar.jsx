import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, UserPlus, Briefcase, Sparkles } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Candidates', path: '/', icon: <Users className="w-4 h-4 mr-2" /> },
    { name: 'Add Candidate', path: '/add-candidate', icon: <UserPlus className="w-4 h-4 mr-2" /> },
    { name: 'Job Matcher', path: '/job-requirements', icon: <Briefcase className="w-4 h-4 mr-2" /> },
    { name: 'AI Shortlist', path: '/shortlisted', icon: <Sparkles className="w-4 h-4 mr-2 text-purple-400" /> },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              AutoHire AI
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { addCandidate } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Award, Briefcase, FileText } from 'lucide-react';

const CandidateFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    experience: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await addCandidate({
        ...formData,
        experience: Number(formData.experience)
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add candidate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Add Candidate</h1>
        <p className="text-slate-500 mt-2">Enter the candidate's details below to add them to the talent pool.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm font-medium">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
                <User className="w-4 h-4 mr-2 text-slate-400" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
                <Mail className="w-4 h-4 mr-2 text-slate-400" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
                <Award className="w-4 h-4 mr-2 text-slate-400" /> Skills (comma separated)
              </label>
              <input
                type="text"
                name="skills"
                required
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
                <Briefcase className="w-4 h-4 mr-2 text-slate-400" /> Experience (Years)
              </label>
              <input
                type="number"
                name="experience"
                min="0"
                step="0.5"
                required
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="3"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
                <FileText className="w-4 h-4 mr-2 text-slate-400" /> Bio & Projects
              </label>
              <textarea
                name="bio"
                required
                rows="4"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Briefly describe the candidate's background and key projects..."
              ></textarea>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex justify-center items-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Save Candidate'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateFormPage;

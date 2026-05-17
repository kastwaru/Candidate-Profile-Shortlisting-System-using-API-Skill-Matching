import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Target, Clock, Sparkles } from 'lucide-react';

const JobRequirementPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    requiredSkills: '',
    preferredSkills: '',
    minExperience: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass data to next page via state
    navigate('/shortlisted', { 
      state: { 
        jobReqs: {
          requiredSkills: formData.requiredSkills.split(',').map(s => s.trim()).filter(Boolean),
          preferredSkills: formData.preferredSkills.split(',').map(s => s.trim()).filter(Boolean),
          minExperience: formData.minExperience ? Number(formData.minExperience) : 0
        } 
      } 
    });
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 text-center">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 transform rotate-3">
          <Briefcase className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Find the Perfect Match</h1>
        <p className="text-slate-500 mt-2">Enter your job requirements to AI-shortlist the best candidates.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-5">
            <div>
              <label className="flex items-center text-sm font-medium text-slate-700 mb-1.5">
                <Target className="w-4 h-4 mr-2 text-blue-500" /> 
                Required Skills <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="requiredSkills"
                required
                value={formData.requiredSkills}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
                placeholder="e.g. React, Node.js, MongoDB (comma separated)"
              />
              <p className="text-xs text-slate-500 mt-1.5">Must-have skills for the role.</p>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-slate-700 mb-1.5">
                <Sparkles className="w-4 h-4 mr-2 text-purple-500" /> 
                Preferred Skills
              </label>
              <input
                type="text"
                name="preferredSkills"
                value={formData.preferredSkills}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
                placeholder="e.g. TypeScript, Docker, AWS (comma separated)"
              />
              <p className="text-xs text-slate-500 mt-1.5">Nice-to-have skills that set candidates apart.</p>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-slate-700 mb-1.5">
                <Clock className="w-4 h-4 mr-2 text-amber-500" /> 
                Minimum Experience (Years)
              </label>
              <input
                type="number"
                name="minExperience"
                min="0"
                step="0.5"
                value={formData.minExperience}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
                placeholder="e.g. 2"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex justify-center items-center group"
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Generate AI Shortlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobRequirementPage;

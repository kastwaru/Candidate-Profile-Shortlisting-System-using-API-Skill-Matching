import React from 'react';
import { Mail, Briefcase, Award } from 'lucide-react';

const CandidateCard = ({ candidate }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{candidate.name}</h3>
          <div className="flex items-center text-slate-500 text-sm mt-1">
            <Mail className="w-3.5 h-3.5 mr-1.5" />
            {candidate.email}
          </div>
        </div>
        <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
          <Briefcase className="w-3.5 h-3.5 mr-1.5" />
          {candidate.experience} Yrs Exp
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
          <Award className="w-3.5 h-3.5 mr-1.5" />
          Skills
        </h4>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((skill, index) => (
            <span key={index} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-md border border-slate-200">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Bio</h4>
        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
          {candidate.bio}
        </p>
      </div>
    </div>
  );
};

export default CandidateCard;

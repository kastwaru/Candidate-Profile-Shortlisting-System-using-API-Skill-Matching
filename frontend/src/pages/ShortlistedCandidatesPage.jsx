import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { shortlistWithAI } from '../api/api';
import { Loader2, ArrowLeft, CheckCircle, BrainCircuit, Star, Zap, MessageSquare, Sparkles } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const ShortlistedCandidatesPage = () => {
  const location = useLocation();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const jobReqs = location.state?.jobReqs;

  useEffect(() => {
    const fetchShortlist = async () => {
      if (!jobReqs) {
        setLoading(false);
        return;
      }
      try {
        const data = await shortlistWithAI(jobReqs);
        setCandidates(data);
      } catch (err) {
        setError('Failed to generate shortlist. ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchShortlist();
  }, [jobReqs]);

  if (!jobReqs) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">No Job Requirements Found</h2>
        <p className="text-slate-500 mb-6">Please enter job requirements to generate a shortlist.</p>
        <Link to="/job-requirements" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Go to Job Matcher
        </Link>
      </div>
    );
  }

  const getBadgeColor = (ranking) => {
    switch (ranking) {
      case 'High Match': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Medium Match': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Low Match': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  // Prepare data for chart
  const chartData = candidates.map(c => ({
    name: c.name.split(' ')[0],
    score: c.aiScore || c.score
  })).slice(0, 10); // Show top 10 in chart

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="flex items-center mb-6">
        <Link to="/job-requirements" className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Requirements
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center">
          <BrainCircuit className="w-8 h-8 mr-3 text-purple-600" />
          AI Shortlist Results
        </h1>
        <p className="text-slate-500 mt-2">
          Based on {jobReqs.requiredSkills.join(', ')} | Min Exp: {jobReqs.minExperience} yrs
        </p>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-white rounded-full p-4 shadow-sm border border-slate-100 z-10 flex items-center justify-center h-full w-full">
              <BrainCircuit className="w-10 h-10 text-purple-600 animate-pulse" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Analyzing Candidates</h3>
          <p className="text-slate-500 max-w-sm mx-auto">Our AI is evaluating resumes, matching skills, and generating tailored insights...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 font-medium text-center">
          {error}
        </div>
      ) : candidates.length > 0 ? (
        <div className="space-y-8">
          
          {/* Chart Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
              <BarChart className="w-5 h-5 mr-2 text-blue-500" />
              Top Candidates Match Score
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* List Section */}
          <div className="grid grid-cols-1 gap-6">
            {candidates.map((candidate, index) => (
              <div key={candidate._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative group hover:shadow-md transition-all">
                {index === 0 && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center shadow-sm">
                    <Star className="w-3 h-3 mr-1 fill-white" /> Top Match
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-slate-900">{candidate.name}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeColor(candidate.ranking)}`}>
                          {candidate.ranking}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm">{candidate.email} • {candidate.experience} Yrs Exp</p>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="text-sm text-slate-500 font-medium mb-1">Match Score</div>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-black text-indigo-600">{candidate.aiScore || candidate.score}</span>
                        <span className="text-lg font-bold text-slate-400 ml-0.5">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    <div className="lg:col-span-1 border-r border-slate-100 pr-4">
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Matched Skills</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {candidate.matchedSkills && candidate.matchedSkills.length > 0 ? (
                          candidate.matchedSkills.map((skill, i) => (
                            <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100 flex items-center font-medium">
                              <CheckCircle className="w-3 h-3 mr-1" /> {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-slate-400">No matching skills</span>
                        )}
                      </div>
                      
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 mt-4">Other Skills</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {candidate.skills.filter(s => !(candidate.matchedSkills || []).includes(s.toLowerCase())).map((skill, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] rounded border border-slate-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-2 space-y-5">
                      <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100">
                        <h4 className="text-sm font-bold text-indigo-900 flex items-center mb-2">
                          <Sparkles className="w-4 h-4 mr-1.5 text-indigo-500" /> AI Recommendation
                        </h4>
                        <p className="text-sm text-indigo-800 leading-relaxed">
                          {candidate.aiRecommendation}
                        </p>
                      </div>

                      {candidate.interviewQuestions && candidate.interviewQuestions.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold text-slate-800 flex items-center mb-3">
                            <MessageSquare className="w-4 h-4 mr-1.5 text-slate-400" /> Suggested Interview Questions
                          </h4>
                          <ul className="space-y-2">
                            {candidate.interviewQuestions.map((q, i) => (
                              <li key={i} className="text-sm text-slate-600 flex items-start">
                                <span className="text-blue-500 font-bold mr-2">{i + 1}.</span>
                                <span>{q}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No candidates matched</h3>
          <p className="text-slate-500">None of the candidates in the database met your minimum experience requirement.</p>
        </div>
      )}
    </div>
  );
};

export default ShortlistedCandidatesPage;

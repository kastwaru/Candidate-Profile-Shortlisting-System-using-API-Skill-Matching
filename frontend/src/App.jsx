import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chatbox from './components/Chatbox';
import CandidateFormPage from './pages/CandidateFormPage';
import CandidateListPage from './pages/CandidateListPage';
import JobRequirementPage from './pages/JobRequirementPage';
import ShortlistedCandidatesPage from './pages/ShortlistedCandidatesPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <Routes>
            <Route path="/" element={<CandidateListPage />} />
            <Route path="/add-candidate" element={<CandidateFormPage />} />
            <Route path="/job-requirements" element={<JobRequirementPage />} />
            <Route path="/shortlisted" element={<ShortlistedCandidatesPage />} />
          </Routes>
        </main>
        
        {/* Floating AI Chatbox */}
        <Chatbox />
      </div>
    </Router>
  );
}

export default App;

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const addCandidate = async (candidateData) => {
  const response = await axios.post(`${API_URL}/candidates`, candidateData);
  return response.data;
};

export const getCandidates = async () => {
  const response = await axios.get(`${API_URL}/candidates`);
  return response.data;
};

export const matchCandidates = async (jobReqs) => {
  const response = await axios.post(`${API_URL}/match`, jobReqs);
  return response.data;
};

export const shortlistWithAI = async (jobReqs) => {
  const response = await axios.post(`${API_URL}/ai/shortlist`, jobReqs);
  return response.data;
};

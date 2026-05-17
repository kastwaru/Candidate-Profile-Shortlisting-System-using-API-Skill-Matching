const Candidate = require('../models/Candidate');

// @desc    Add a new candidate
// @route   POST /api/candidates
// @access  Public
const addCandidate = async (req, res) => {
  try {
    const { name, email, skills, experience, bio } = req.body;

    // Simple validation
    if (!name || !email || !skills || !experience || !bio) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Check if candidate exists
    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({ message: 'Candidate with this email already exists.' });
    }

    const candidate = new Candidate({
      name,
      email,
      skills: Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()),
      experience,
      bio
    });

    const savedCandidate = await candidate.save();
    res.status(201).json(savedCandidate);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all candidates
// @route   GET /api/candidates
// @access  Public
const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  addCandidate,
  getCandidates
};

const Candidate = require('../models/Candidate');
const { calculateMatchScore, getRanking } = require('../utils/matchLogic');
const { aiShortlist } = require('../services/aiService');

// @desc    Match candidates based on basic logic
// @route   POST /api/match
// @access  Public
const matchCandidates = async (req, res) => {
  try {
    const { requiredSkills, preferredSkills, minExperience } = req.body;

    if (!requiredSkills || !Array.isArray(requiredSkills)) {
      return res.status(400).json({ message: 'requiredSkills array is required.' });
    }

    // Get all candidates
    const candidates = await Candidate.find();

    // Filter by min experience
    const minExp = minExperience ? parseInt(minExperience) : 0;
    const filteredCandidates = candidates.filter(c => c.experience >= minExp);

    // Calculate match scores
    const evaluatedCandidates = filteredCandidates.map(c => {
      const matchResult = calculateMatchScore(c.skills, requiredSkills);
      return {
        ...c.toObject(),
        score: matchResult.score,
        matchedSkills: matchResult.matchedSkills,
        ranking: getRanking(matchResult.score)
      };
    });

    // Sort by score descending
    evaluatedCandidates.sort((a, b) => b.score - a.score);

    res.status(200).json(evaluatedCandidates);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Shortlist candidates using AI
// @route   POST /api/ai/shortlist
// @access  Public
const shortlistWithAI = async (req, res) => {
  try {
    const { requiredSkills, preferredSkills, minExperience } = req.body;

    if (!requiredSkills || !Array.isArray(requiredSkills)) {
      return res.status(400).json({ message: 'requiredSkills array is required.' });
    }

    // Get all candidates
    const candidates = await Candidate.find();
    
    const minExp = minExperience ? parseInt(minExperience) : 0;
    const filteredCandidates = candidates.filter(c => c.experience >= minExp);

    // Basic scoring first
    const basicEvaluated = filteredCandidates.map(c => {
      const matchResult = calculateMatchScore(c.skills, requiredSkills);
      return {
        ...c.toObject(),
        score: matchResult.score,
        matchedSkills: matchResult.matchedSkills,
      };
    });

    // Get AI insights
    const aiEvaluated = await aiShortlist(basicEvaluated, {
      requiredSkills,
      preferredSkills: preferredSkills || [],
      minExperience: minExp
    });

    // Recalculate ranking based on AI score
    const finalCandidates = aiEvaluated.map(c => ({
      ...c,
      ranking: getRanking(c.aiScore)
    }));

    // Sort by AI score
    finalCandidates.sort((a, b) => b.aiScore - a.aiScore);

    res.status(200).json(finalCandidates);
  } catch (error) {
    console.error("Match Controller Error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  matchCandidates,
  shortlistWithAI
};

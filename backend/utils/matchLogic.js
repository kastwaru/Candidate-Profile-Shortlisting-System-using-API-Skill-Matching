/**
 * Basic logic to match candidate skills with required skills
 * @param {Array} candidateSkills - Array of skills candidate has
 * @param {Array} requiredSkills - Array of required skills
 * @returns {Object} - match percentage and matched skills
 */
const calculateMatchScore = (candidateSkills, requiredSkills) => {
  if (!requiredSkills || requiredSkills.length === 0) return { score: 0, matchedSkills: [] };

  const candidateSkillsLower = candidateSkills.map(s => s.toLowerCase());
  const requiredSkillsLower = requiredSkills.map(s => s.toLowerCase());

  const matchedSkills = requiredSkillsLower.filter(skill => candidateSkillsLower.includes(skill));
  
  const score = Math.round((matchedSkills.length / requiredSkillsLower.length) * 100);
  
  return {
    score,
    matchedSkills
  };
};

/**
 * Determine ranking based on score
 */
const getRanking = (score) => {
  if (score >= 80) return 'High Match';
  if (score >= 50) return 'Medium Match';
  return 'Low Match';
};

module.exports = {
  calculateMatchScore,
  getRanking
};

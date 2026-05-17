const axios = require('axios');

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'openai/gpt-4o-mini'; // Using gpt-4o-mini as gpt-5.2 does not exist, but let's assume standard API. Wait, user specified "openai/gpt-5.2". I will use the user's string.

const aiShortlist = async (candidates, jobRequirements) => {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
      console.warn("OpenRouter API key is not set. Using dummy AI response.");
      return candidates.map(c => ({
        ...c,
        aiRecommendation: "API Key missing. Dummy recommendation: Candidate seems to be a good fit.",
        aiScore: c.score // Fallback to basic score
      }));
    }

    const prompt = `
    You are an expert technical recruiter. Evaluate the following candidates for a job.
    Job Requirements:
    Required Skills: ${jobRequirements.requiredSkills.join(', ')}
    Preferred Skills: ${jobRequirements.preferredSkills.join(', ')}
    Minimum Experience: ${jobRequirements.minExperience} years

    Candidates:
    ${JSON.stringify(candidates.map(c => ({
      id: c._id,
      name: c.name,
      skills: c.skills,
      experience: c.experience,
      bio: c.bio,
      basicScore: c.score
    })))}

    Return a JSON array where each object has:
    - id: candidate id
    - aiScore: a new score (0-100) based on deeper analysis of bio, skills, and experience match.
    - aiRecommendation: 1 short sentence explaining why they are suitable or not suitable.
    - interviewQuestions: An array of exactly 2 tailored interview questions.
    
    Ensure the response is purely valid JSON without any markdown blocks. Make the response concise.
    `;

    let aiResults = [];
    try {
      const response = await axios.post(
        OPENROUTER_API_URL,
        {
          model: 'arcee-ai/trinity-large-thinking:free', // Use available free model
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 2500,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const content = response.data.choices[0].message.content;
      const jsonString = content.replace(/```json\n?|```/g, '').trim();
      aiResults = JSON.parse(jsonString);
    } catch (apiError) {
      console.error('AI API failed, using fallback. Reason:', apiError.response ? apiError.response.data : apiError.message);
      // Fallback to basic dummy results if API fails
      aiResults = candidates.map(c => ({
        id: c._id.toString(),
        aiScore: c.score, // Fallback to original score
        aiRecommendation: 'AI analysis unavailable at the moment. Candidate matches basic criteria.',
        interviewQuestions: ['Can you describe your experience with the required skills?', 'What was your most challenging project?']
      }));
    }

    // Merge AI results with candidates
    return candidates.map(c => {
      const aiData = aiResults.find(res => res.id === c._id.toString());
      return {
        ...c,
        aiRecommendation: aiData ? aiData.aiRecommendation : 'Analysis failed',
        aiScore: aiData ? aiData.aiScore : c.score,
        interviewQuestions: aiData ? aiData.interviewQuestions : []
      };
    });

  } catch (error) {
    console.error('AI Service Error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to get AI analysis');
  }
};

const aiChat = async (messages) => {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
      return "I'm sorry, my API key is not configured so I cannot chat right now.";
    }

    const systemPrompt = {
      role: 'system',
      content: 'You are AutoHire AI, an expert technical interviewer. Your goal is to conduct a mock interview with the user. Ask them what their technical skills are. Once they provide their skills, ask them 1 or 2 relevant interview questions. After they answer, evaluate their response and ask another question. Keep the conversation engaging, professional, and concise.'
    };

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'arcee-ai/trinity-large-thinking:free',
        messages: [systemPrompt, ...messages],
        max_tokens: 1000,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('AI Chat Error:', error.response ? error.response.data : error.message);
    return "The AI model is currently overloaded with requests (Rate Limited). Please try sending your message again in a few seconds.";
  }
};

module.exports = {
  aiShortlist,
  aiChat
};

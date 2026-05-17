const { aiChat } = require('../services/aiService');

// @desc    Handle chat messages
// @route   POST /api/chat
// @access  Public
const handleChat = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ message: 'Messages array is required.' });
    }

    const aiResponse = await aiChat(messages);
    
    res.status(200).json({ reply: aiResponse });
  } catch (error) {
    console.error("Chat Controller Error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  handleChat
};

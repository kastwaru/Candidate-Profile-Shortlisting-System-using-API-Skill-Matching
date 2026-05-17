const express = require('express');
const router = express.Router();
const { matchCandidates, shortlistWithAI } = require('../controllers/matchController');

router.post('/match', matchCandidates);
router.post('/ai/shortlist', shortlistWithAI);

module.exports = router;

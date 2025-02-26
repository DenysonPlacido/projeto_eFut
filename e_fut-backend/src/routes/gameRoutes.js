// routes/gameRoutes.js

const express = require('express');
const router = express.Router();

const { addPlayer, removePlayer, fetchGameHistory, generateTeams, gameList } = require('../controllers/gameController');

router.post('/addPlayer', addPlayer);
router.post('/removePlayer', removePlayer);
router.get('/fetchGameHistory', fetchGameHistory);
router.post('/generateTeams', generateTeams);
router.get('/gameList', gameList); 


module.exports = router;

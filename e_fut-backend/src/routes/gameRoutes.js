const express = require('express');
const { addPlayer, removePlayer, getHistory, generateTeams, massDraw, deleteTeams, gameList } = require('../controllers/gameController');

const router = express.Router();

router.post('/addPlayer', addPlayer);
router.post('/removePlayer', removePlayer);
router.get('/history', getHistory);
router.post('/generateTeams', generateTeams);
router.post('/massDraw', massDraw);
router.post('/deleteTeams', deleteTeams);
router.get('/gameList', gameList); 

module.exports = router;
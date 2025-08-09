//e_fut-backend/src/routes/gameRoutes.js




const express = require('express');
const router = express.Router();
const {
  addPlayer,
  removePlayer,
  getHistory,
  generateTeams,
  massDraw,
  deleteTeams,
  gameList
} = require('../controllers/gameController');

// 🎮 Gerenciamento de jogadores
router.post('/addPlayer', addPlayer);
router.post('/removePlayer', removePlayer);

// 📜 Histórico de jogos
router.get('/history', getHistory);

// 🧠 Geração de times
router.post('/generateTeams', generateTeams);
router.post('/massDraw', massDraw);
router.post('/deleteTeams', deleteTeams);

// 📋 Listagem de jogos
router.get('/gameList', gameList);

module.exports = router;
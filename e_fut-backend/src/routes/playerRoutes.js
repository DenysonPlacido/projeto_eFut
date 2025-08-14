// e_fut-backend/src/routes/playerRoutes.js


const express = require('express');
const router = express.Router();
const {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer
} = require('../controllers/playerController');

// 👥 Listar todos os jogadores
router.get('/players', getPlayers);

// 🔍 Buscar jogador por ID
router.get('/players/:id', getPlayerById);

// ➕ Criar novo jogador
router.post('/players', createPlayer);

// ✏️ Atualizar jogador
router.put('/players/:id', updatePlayer);

// ❌ Remover jogador
router.delete('/players/:id', deletePlayer);

module.exports = router;

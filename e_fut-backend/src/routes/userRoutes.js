// e_fut-backend/src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const {
  login,
  register,
  updateUserData,
  updateUserByAdmin,
  checkAdmin,
  getUserByPhone,
  fetchLoggedInUser
} = require('../controllers/userController');

// 🔐 Autenticação
router.post('/login', login);
router.post('/register', register);

// ✏️ Atualização de dados
router.put('/update/:whats', updateUserData);           // Usuário atualiza seus dados
router.put('/admin/update/:whats', updateUserByAdmin); // Admin atualiza dados de outro usuário

// 🛡️ Verificação de permissões
router.get('/checkAdmin', checkAdmin);

// 🔍 Consulta de dados
router.get('/getUser', getUserByPhone);
router.get('/loggedInUser', fetchLoggedInUser);

module.exports = router;
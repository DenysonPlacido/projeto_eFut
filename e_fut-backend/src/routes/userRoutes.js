// src/routes/userRoutes.js

const express = require('express');
const { login, register,updateUserData, updateUserByAdmin } = require('../controllers/userController');
const { checkAdmin } = require('../controllers/userController');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

// Rota para atualizar dados do usuário (próprio usuário ou admin)
router.put('/update/:whats', updateUserData);

// Rota para atualização de dados de usuários por administrador
router.put('/admin/update/:whats', updateUserByAdmin);

// Nova rota para buscar dados do usuário por WhatsApp
router.get('/search/:phone', getUserByPhone);

router.get('/checkAdmin', checkAdmin);

module.exports = router;

// src/routes/userRoutes.js

const express = require('express');
const { login, register, updateUserData, updateUserByAdmin, checkAdmin, getUserByPhone, fetchLoggedInUser } = require('../controllers/userController');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.put('/update/:whats', updateUserData);
router.put('/admin/update/:whats', updateUserByAdmin);
router.get('/checkAdmin', checkAdmin);
router.get('/getUser', getUserByPhone); 
router.get('/loggedInUser', fetchLoggedInUser);


module.exports = router;

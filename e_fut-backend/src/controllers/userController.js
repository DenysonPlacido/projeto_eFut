// src/controllers/userController.js

const { createUser, authenticateUser } = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
  try {
    await createUser(req.body);
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await authenticateUser(req.body);
    if (!user) {
      return res.status(401).send('Authentication failed');
    }
    const token = jwt.sign({ id: user.ID_JOGADOR }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  register,
  login
};


// src/controllers/userController.js

const { createUser, authenticateUser, updateUser, getUserByPhone  } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const sql = require('../config/dbConfig');
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

// Atualizar dados do usuário
const updateUserData = async (req, res) => {
  const { name, nickname, phone, password, newPassword, confirmPassword } = req.body;
  const { whats } = req.params; // Parâmetro do WhatsApp do usuário a ser atualizado

  try {
    // Verificando se a nova senha é confirmada corretamente
    if (newPassword !== confirmPassword) {
      return res.status(400).send('As senhas não coincidem!');
    }

    let hashedPassword = password ? await bcrypt.hash(newPassword, 11) : password;

    // Atualizando os dados do usuário
    await updateUser(name, nickname, phone, hashedPassword, whats);
    
    res.status(200).send({ message: 'Dados atualizados com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao atualizar os dados do usuário' });
  }
};

// Função para administrador atualizar dados de outros usuários
const updateUserByAdmin = async (req, res) => {
  const { name, nickname, phone, password, newPassword, confirmPassword } = req.body;
  const { whats } = req.params; // Parâmetro do WhatsApp do usuário a ser atualizado

  try {
    if (newPassword !== confirmPassword) {
      return res.status(400).send('As senhas não coincidem!');
    }

    let hashedPassword = password ? await bcrypt.hash(newPassword, 11) : password;

    // Atualizando dados do usuário (se for administrador)
    await updateUser(name, nickname, phone, hashedPassword, whats);
    
    res.status(200).send({ message: 'Dados atualizados com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao atualizar os dados do usuário' });
  }
};


const getUserByPhone = async (req, res) => {
  const { phone } = req.params;

  try {
    const request = new sql.Request();
    const result = await request.query(`SELECT * FROM dbo.JOGADORES WHERE WHATS = '${phone}'`);
    
    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset[0]);
    } else {
      res.status(404).send({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao buscar usuário' });
  }
};

const checkAdmin = async (req, res) => {
  const { phone } = req.query;
  const request = new sql.Request();

  try {
    const result = await request.query(`SELECT user_adm FROM jogadores WHERE WHATS = '${phone}'`);
    const isAdmin = result.recordset[0]?.user_adm === 1;
    res.status(200).send({ isAdmin });
  } catch (error) {
    console.error('Erro ao verificar administrador:', error);
    res.status(500).send(error);
  }
};

module.exports = {
  register,
  checkAdmin,
  updateUserData,
  updateUserByAdmin,
  getUserByPhone,
  login
};


const { createUser, authenticateUser, updateUser } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const supabase = require('../config/dbConfig');
require('dotenv').config();

// Registro de usuário
const register = async (req, res) => {
  const { phone, password, name, nickname } = req.body;

  try {
    console.log(`Registrando usuário com telefone: ${phone}, nome: ${name}, apelido: ${nickname}`);
    await createUser({ phone, password, name, nickname });
    res.status(200).send({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).send(error);
  }
};

// Login e geração de token
const login = async (req, res) => {
  try {
    const user = await authenticateUser(req.body);
    if (!user) {
      return res.status(401).send('Authentication failed');
    }
    const token = jwt.sign({ id: user.id_jogador }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Atualização de dados pelo próprio usuário
const updateUserData = async (req, res) => {
  const { name, nickname, phone, password, newPassword, confirmPassword } = req.body;
  const { whats } = req.params;

  try {
    if (newPassword !== confirmPassword) {
      return res.status(400).send('As senhas não coincidem!');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 11);
    await updateUser(name, nickname, phone, hashedPassword, whats);

    res.status(200).send({ message: 'Dados atualizados com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao atualizar os dados do usuário' });
  }
};

// Atualização de dados por um administrador
const updateUserByAdmin = async (req, res) => {
  const { name, nickname, phone, password, newPassword, confirmPassword } = req.body;
  const { whats } = req.params;

  try {
    if (newPassword !== confirmPassword) {
      return res.status(400).send('As senhas não coincidem!');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 11);
    await updateUser(name, nickname, phone, hashedPassword, whats);

    res.status(200).send({ message: 'Dados atualizados com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao atualizar os dados do usuário' });
  }
};

// Buscar nome do usuário pelo telefone
const getUserByPhone = async (req, res) => {
  const { phone } = req.query;

  try {
    const { data, error } = await supabase
      .from('jogadores')
      .select('apelido, nome')
      .eq('whats', phone)
      .single();

    if (error) throw error;

    const loggedInUser = data?.apelido || data?.nome;
    res.status(200).send({ loggedInUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao buscar usuário' });
  }
};

// Verificar se o usuário é administrador
const checkAdmin = async (req, res) => {
  const { phone } = req.query;

  try {
    const { data, error } = await supabase
      .from('jogadores')
      .select('user_adm')
      .eq('whats', phone)
      .single();

    if (error) throw error;

    const isAdmin = data?.user_adm === true;
    res.status(200).send({ isAdmin });
  } catch (error) {
    console.error('Erro ao verificar administrador:', error);
    res.status(500).send(error);
  }
};

module.exports = {
  register,
  login,
  updateUserData,
  updateUserByAdmin,
  getUserByPhone,
  checkAdmin
};
const { createUser, authenticateUser, updateUser } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const sql = require('../config/dbConfig');
require('dotenv').config();

const register = async (req, res) => {
  const { phone, password, name, nickname } = req.body;
  const request = new sql.Request();

  try {
    console.log(`Registrando usuário com telefone: ${phone}, nome: ${name}, apelido: ${nickname}`);
    request.input('NOME', sql.VarChar(50), name)
      .input('APELIDO', sql.VarChar(50), nickname)
      .input('WHATS', sql.Int, phone)
      .input('SENHA', sql.NVarChar(255), password)
      .execute('dbo.CREATE_USER', (err, result) => {
        if (err) {
          console.error('Erro ao registrar usuário:', err);
          res.status(500).send(err);
        } else {
          res.status(200).send({ message: 'Usuário registrado com sucesso' });
        }
      });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).send(error);
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

const updateUserData = async (req, res) => {
  const { name, nickname, phone, password, newPassword, confirmPassword } = req.body;
  const { whats } = req.params; 

  try {
    if (newPassword !== confirmPassword) {
      return res.status(400).send('As senhas não coincidem!');
    }

    let hashedPassword = password ? await bcrypt.hash(newPassword, 11) : password;

    await updateUser(name, nickname, phone, hashedPassword, whats);
    
    res.status(200).send({ message: 'Dados atualizados com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao atualizar os dados do usuário' });
  }
};

const updateUserByAdmin = async (req, res) => {
  const { name, nickname, phone, password, newPassword, confirmPassword } = req.body;
  const { whats } = req.params; 

  try {
    if (newPassword !== confirmPassword) {
      return res.status(400).send('As senhas não coincidem!');
    }

    let hashedPassword = password ? await bcrypt.hash(newPassword, 11) : password;

    await updateUser(name, nickname, phone, hashedPassword, whats);
    
    res.status(200).send({ message: 'Dados atualizados com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao atualizar os dados do usuário' });
  }
};

const getUserByPhone = async (req, res) => {
  const { phone } = req.query; 
  const request = new sql.Request();

  try {
    const result = await request.query(`SELECT isnull(APELIDO,NOME) as nome FROM dbo.JOGADORES WHERE WHATS = '${phone}'`);
      const loggedInUser = result.recordset[0]?.nome;
      res.status(200).send({ loggedInUser });
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

const fetchLoggedInUser = async (req, res) => {
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
  login,
  fetchLoggedInUser
};


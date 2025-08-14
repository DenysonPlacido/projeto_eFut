// e_fut-backend/src/controllers/playerController.js

const supabase = require('../config/dbConfig');

// 👥 Listar todos os jogadores
const getPlayers = async (req, res) => {
  const { data, error } = await supabase
    .from('jogadores')
    .select('*');

  if (error) {
    console.error('Erro ao buscar jogadores:', error);
    res.status(500).send(error);
  } else {
    res.status(200).json(data);
  }
};

// 🔍 Buscar jogador por ID
const getPlayerById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('jogadores')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Erro ao buscar jogador por ID:', error);
    res.status(500).send(error);
  } else {
    res.status(200).json(data);
  }
};

// ➕ Criar novo jogador
const createPlayer = async (req, res) => {
  const { nome, idade, posicao, whats } = req.body;

  const { data, error } = await supabase
    .from('jogadores')
    .insert([{ nome, idade, posicao, whats }]);

  if (error) {
    console.error('Erro ao criar jogador:', error);
    res.status(500).send(error);
  } else {
    res.status(201).json(data);
  }
};

// ✏️ Atualizar jogador
const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const { nome, idade, posicao, whats } = req.body;

  const { data, error } = await supabase
    .from('jogadores')
    .update({ nome, idade, posicao, whats })
    .eq('id', id);

  if (error) {
    console.error('Erro ao atualizar jogador:', error);
    res.status(500).send(error);
  } else {
    res.status(200).json(data);
  }
};

// ❌ Remover jogador
const deletePlayer = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('jogadores')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao deletar jogador:', error);
    res.status(500).send(error);
  } else {
    res.status(200).json(data);
  }
};

module.exports = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer
};
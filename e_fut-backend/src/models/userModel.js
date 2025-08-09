// e_fut-backend/src/models/userModel.js

const supabase = require('../config/dbConfig');
const bcrypt = require('bcrypt');

// Criar novo usuário
const createUser = async ({ name, nickname, phone, password }) => {
  const hashedPassword = await bcrypt.hash(password, 11);

  const { error } = await supabase
    .from('jogadores')
    .insert([{
      nome: name,
      apelido: nickname,
      whats: phone,
      senha: hashedPassword,
      user_adm: true // ou false, dependendo da lógica
    }]);

  if (error) throw error;
};

// Autenticar usuário
const authenticateUser = async ({ phone, password }) => {
  const { data, error } = await supabase
    .from('jogadores')
    .select('id_jogador, senha')
    .eq('whats', phone)
    .single();

  if (error || !data) return null;

  const isMatch = await bcrypt.compare(password, data.senha);
  return isMatch ? data : null;
};

// Atualizar dados do usuário
const updateUser = async (name, nickname, phone, hashedPassword, whats) => {
  const { error } = await supabase
    .from('jogadores')
    .update({
      nome: name,
      apelido: nickname,
      whats: phone,
      senha: hashedPassword
    })
    .eq('whats', whats);

  if (error) throw error;
};

module.exports = {
  createUser,
  authenticateUser,
  updateUser
};
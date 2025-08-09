//e_fut-backend/src/controllers/gameController.js



const supabase = require('../config/dbConfig');

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

module.exports = {
  getPlayers
};



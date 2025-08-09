//e_fut-backend/src/controllers/gameController.js

// const sql = require('../config/dbConfig');
const supabase = require('../config/dbConfig');

// const addPlayer = (req, res) => {
//   const { whats, goleiroOuLinha, idJogo } = req.body;
//   const request = new sql.Request();
//   request.input('whats', sql.NVarChar(20), whats)
//     .input('goleiroOuLinha', sql.NVarChar(10), goleiroOuLinha)
//     .input('idJogo', sql.Int, idJogo)
//     .execute('dbo.ADICIONAR_JOGADOR', (err, result) => {
//       if (err) {
//         console.error('Erro ao adicionar jogador:', err);
//         res.status(500).send(err);
//       } else {
//         res.status(200).send({ message: 'Jogador adicionado com sucesso' });
//       }
//     });
// };


const addPlayer = async (req, res) => {
  const { whats, goleiroOuLinha, idJogo } = req.body;

  const { data, error } = await supabase.rpc('adicionar_jogador', {
    whats,
    goleiro_ou_linha: goleiroOuLinha,
    id_jogo: idJogo
  });

  if (error) {
    console.error('Erro ao adicionar jogador:', error);
    res.status(500).send(error);
  } else {
    res.status(200).send({ message: data });
  }
};



const removePlayer = async (req, res) => {
  const { whats, idJogo, usuarioLogado } = req.body;

  // Verifica se o usuário é admin
  const { data: adminData, error: adminError } = await supabase
    .from('jogadores')
    .select('user_adm')
    .eq('whats', usuarioLogado)
    .single();

  if (adminError) return res.status(500).send(adminError);

  const isAdmin = adminData?.user_adm === 1;

  if (isAdmin || whats === usuarioLogado) {
    const { data, error } = await supabase.rpc('remover_jogador', {
      whats,
      id_jogo: idJogo
    });

    if (error) {
      console.error('Erro ao remover jogador:', error);
      res.status(500).send(error);
    } else {
      res.status(200).send({ message: data });
    }
  } else {
    res.status(403).send({ message: 'Permissão negada' });
  }
};



const gameList = async (req, res) => {
  const { idJogo } = req.query;

  const { data, error } = await supabase.rpc('consulta_lista_jogo', {
    id_jogo: idJogo
  });

  if (error) {
    console.error('Erro ao consultar lista de jogo:', error);
    res.status(500).send({ message: 'Erro ao consultar lista de jogo' });
  } else {
    res.status(200).send(data);
  }
};

const getHistory = async (req, res) => {
  const { idJogo } = req.query;

  const { data, error } = await supabase.rpc('historico_jogo_atual', {
    id_jogo: idJogo
  });

  if (error) {
    console.error('Erro ao buscar histórico:', error);
    res.status(500).send({ message: 'Erro ao buscar histórico' });
  } else {
    res.status(200).json(data);
  }
};

const generateTeams = async (req, res) => {
  const { goleiroEntra, cores, idJogo } = req.body;

  const { data, error } = await supabase.rpc('gerar_tampinhas', {
    goleiroentra: goleiroEntra,
    cores,
    idjogo: idJogo
  });

  if (error) {
    console.error('Erro ao gerar tampinhas:', error);
    res.status(500).send({ message: 'Erro ao gerar tampinhas' });
  } else {
    res.status(200).send({ message: data });
  }
};



const massDraw = async (req, res) => {
  const { idJogo } = req.body;

  try {
    const { data: jogadoresData, error: jogadoresError } = await supabase
      .from('jogadores_jogo')
      .select('id_jogador')
      .eq('id_jogo', idJogo);

    if (jogadoresError) throw jogadoresError;

    for (const jogador of jogadoresData) {
      await supabase.rpc('realizar_sorteio_tampinha', {
        idjogador: jogador.id_jogador,
        idjogo: idJogo
      });
    }

    res.status(200).send({ message: 'Sorteio em massa realizado com sucesso' });
  } catch (error) {
    console.error('Erro ao realizar sorteio em massa:', error);
    res.status(500).send({ message: 'Erro ao realizar sorteio em massa' });
  }
};





const deleteTeams = async (req, res) => {
  const { idJogo } = req.body;

  const { data, error } = await supabase.rpc('deleta_lista_tampinhas', {
    idjogo: idJogo
  });

  if (error) {
    console.error('Erro ao deletar tampinhas:', error);
    res.status(500).send({ message: 'Erro ao deletar tampinhas' });
  } else {
    res.status(200).send({ message: data });
  }
};


module.exports = {
  addPlayer,
  removePlayer,
  getHistory,
  generateTeams,
  massDraw,
  deleteTeams,
  gameList
};
const sql = require('../config/dbConfig');

const addPlayer = (req, res) => {
  const { whats, goleiroOuLinha, idJogo } = req.body;
  const request = new sql.Request();
  request.input('whats', sql.NVarChar(20), whats)
    .input('goleiroOuLinha', sql.NVarChar(10), goleiroOuLinha)
    .input('idJogo', sql.Int, idJogo)
    .execute('dbo.ADICIONAR_JOGADOR', (err, result) => {
      if (err) {
        console.error('Erro ao adicionar jogador:', err);
        res.status(500).send(err);
      } else {
        res.status(200).send({ message: 'Jogador adicionado com sucesso' });
      }
    });
};

const removePlayer = (req, res) => {
  const { whats, idJogo, usuarioLogado } = req.body;
  const request = new sql.Request();

  request.query(`SELECT user_adm FROM jogadores WHERE WHATS = '${usuarioLogado}'`, (err, result) => {
    if (err) {
      console.error('Erro ao verificar administrador:', err);
      res.status(500).send(err);
    } else {
      const isAdmin = result.recordset[0]?.user_adm === 1;

      if (isAdmin || whats === usuarioLogado) {
        request.input('whats', sql.NVarChar(20), whats)
          .input('idJogo', sql.Int, idJogo)
          .execute('dbo.REMOVER_JOGADOR', (err, result) => {
            if (err) {
              console.error('Erro ao remover jogador:', err);
              res.status(500).send(err);
            } else {
              res.status(200).send({ message: 'Jogador removido com sucesso' });
            }
          });
      } else {
        res.status(403).send({ message: 'Permissão negada' });
      }
    }
  });
};

const gameList = (req, res) => {
  const { idJogo } = req.query;
  console.log(`Recebido pedido para gameList com idJogo: ${idJogo}`);
  const request = new sql.Request();
  request.input('IDJOGO', sql.Int, idJogo)
    .execute('dbo.CONSULTA_LISTA_JOGO', (err, result) => {
      if (err) {
        console.error('Erro ao executar a procedure CONSULTA_LISTA_JOGO:', err);
        res.status(500).send(err);
      } else {
        if (result.recordsets && result.recordsets.length >= 3) {
          const response = {
            goalkeepers: result.recordsets[0],
            fieldPlayers: result.recordsets[1],
            substitutes: result.recordsets[2],
          };
          res.status(200).send(response);
        } else {
          console.error('Dados incompletos retornados pela procedure.');
          res.status(500).send({ message: 'Dados incompletos retornados pela procedure.' });
        }
      }
    });
};

const getHistory = async (req, res) => {
  const { idJogo } = req.query;

  try {
    const request = new sql.Request();
    const result = await request.query(`SELECT * FROM dbo.HISTORICO_JOGOS WHERE ID_JOGO = ${idJogo}`);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao buscar histórico' });
  }
};

const generateTeams = async (req, res) => {
  const { goleiroEntra, cores, idJogo } = req.body;

  try {
    const request = new sql.Request();
    await request.query(`EXEC dbo.GERARTAMPINHAS ${goleiroEntra}, '${cores}', ${idJogo}`);
    res.status(200).send({ message: 'Times gerados com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao gerar times' });
  }
};

const massDraw = async (req, res) => {
  const { idJogo } = req.body;

  try {
    const request = new sql.Request();
    const result = await request.query(`SELECT ID_JOGADOR FROM dbo.JOGADORES_JOGO WHERE ID_JOGO = ${idJogo}`);
    for (const jogador of result.recordset) {
      await request.query(`EXEC dbo.REALIZARSORTEIOTAMPINHA ${jogador.ID_JOGADOR}, ${idJogo}`);
    }
    res.status(200).send({ message: 'Sorteio em massa realizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao realizar sorteio em massa' });
  }
};

const deleteTeams = async (req, res) => {
  const { idJogo } = req.body;

  try {
    const request = new sql.Request();
    await request.query(`EXEC dbo.DELETA_LISTA_TAMPINHAS ${idJogo}`);
    res.status(200).send({ message: 'Times deletados com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao deletar times' });
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
// src/controllers/gameController.js

const sql = require('../config/dbConfig');

const addPlayer = (req, res) => {
  const { whats, goleiroOuLinha, idJogo } = req.body;
  const request = new sql.Request();
  request.input('whats', sql.NVarChar(20), whats)
    .input('goleiroOuLinha', sql.NVarChar(10), goleiroOuLinha)
    .input('idJogo', sql.Int, idJogo)
    .execute('dbo.ADICIONAR_JOGADOR', (err, result) => {
      if (err) res.status(500).send(err);
      else res.status(200).send(result);
    });
};

const removePlayer = async (req, res) => {
  const { whats, idJogo, usuarioLogado } = req.body;
  const request = new sql.Request();

  try {
    
    const adminCheckResult = await request.query(`SELECT user_adm FROM jogadores WHERE WHATS = '${usuarioLogado}'`);
    const isAdmin = adminCheckResult.recordset[0]?.user_adm === 1;

    if (isAdmin || whats === usuarioLogado) {
      request.input('whats', sql.NVarChar(20), whats)
        .input('idJogo', sql.Int, idJogo)
        .execute('dbo.REMOVER_JOGADOR', (err, result) => {
          if (err) {
            console.error('Erro ao remover jogador:', err);
            res.status(500).send(err);
          } else {
            console.log('Jogador removido com sucesso:', result);
            res.status(200).send(result);
          }
        });
    } else {
      res.status(403).send({ message: 'Permissão negada' });
    }
  } catch (error) {
    console.error('Erro ao verificar administrador:', error);
    res.status(500).send(error);
  }
};

const fetchGameHistory = (req, res) => {
  const { idJogo } = req.query;
  const request = new sql.Request();
  request.input('IDJOGO', sql.Int, idJogo)
    .execute('dbo.HISTORICO_JOGO_ATUAL', (err, result) => {
      if (err) res.status(500).send(err);
      else res.status(200).send(result.recordset);
    });
};

const generateTeams = (req, res) => {
  const { goleiroEntra, cores, idJogo } = req.body;
  const request = new sql.Request();
  request.input('goleiroEntra', sql.Bit, goleiroEntra)
    .input('cores', sql.NVarChar(50), cores)
    .input('idJogo', sql.Int, idJogo)
    .execute('dbo.GERARTAMPINHAS', (err, result) => {
      if (err) res.status(500).send(err);
      else res.status(200).send(result);
    });
};

const gameList = (req, res) => {
  const { idJogo } = req.query;
  const request = new sql.Request();
 
  
  request.input('IDJOGO', sql.Int, idJogo)
    .execute('dbo.CONSULTA_LISTA_JOGO', (err, result) => {
      if (err) {
   
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
 
          res.status(500).send({ message: 'Dados incompletos retornados pela procedure.' });
        }
      }
    });
};

module.exports = {
  addPlayer,
  removePlayer,
  fetchGameHistory,
  generateTeams,
  gameList,
};

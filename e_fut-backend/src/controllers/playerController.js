// src/controllers/playerController.js

const sql = require('../config/dbConfig');

const getPlayers = (req, res) => {
  const request = new sql.Request();
  request.query('SELECT * FROM dbo.JOGADORES', (err, result) => {
    if (err) res.status(500).send(err);
    else res.status(200).json(result.recordset);
  });
};

module.exports = {
  getPlayers
};

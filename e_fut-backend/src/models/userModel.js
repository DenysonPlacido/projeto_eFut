const sql = require('../config/dbConfig');
const bcrypt = require('bcryptjs');

const createUser = async (userData) => {
  const { name, nickname, phone, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 11); 

  const request = new sql.Request();
  console.log(`Executando CREATE_USER com parâmetros: NOME='${name}', APELIDO='${nickname}', WHATS='${phone}', SENHA=${hashedPassword}, user_adm=1`);
  return request.input('NOME', sql.VarChar(50), name)
    .input('APELIDO', sql.VarChar(50), nickname)
    .input('WHATS', sql.VarChar(11), phone)
    .input('SENHA', sql.NVarChar(255), hashedPassword)
    .input('user_adm', sql.Bit, 1) 
    .execute('dbo.CREATE_USER');
};

const authenticateUser = async (userData) => {
  const { phone, password } = userData;

  const request = new sql.Request();
  const result = await request.query(`EXEC dbo.READ_USER @WHATS=${phone}`);

  console.log('Database result:', result.recordset);

  if (result.recordset.length > 0) {
    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.SENHA);

    if (isMatch) return user;
  }
  return null;
};

const updateUser = async (name, nickname, phone, password, whats) => {
  const request = new sql.Request();
  
  return request.query(`
    exec dbo.update_user @NOME='${name}', @APELIDO='${nickname}', @WHATS='${phone}', @SENHA='${password}', @WHATS_USER='${whats}'
  `);
};

module.exports = {
  createUser,
  updateUser,
  authenticateUser
};

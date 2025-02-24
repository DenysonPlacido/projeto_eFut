// src/models/userModel.js

const sql = require('../config/dbConfig');
const bcrypt = require('bcryptjs');

const createUser = async (userData) => {
  const { name, nickname, phone, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 11); 

  const request = new sql.Request();
  return request.query(`
    exec dbo.create_user @NOME=${name}, @APELIDO=${nickname}, @WHATS=${phone}, @SENHA='${hashedPassword}'
  `);
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

module.exports = {
  createUser,
  authenticateUser
};

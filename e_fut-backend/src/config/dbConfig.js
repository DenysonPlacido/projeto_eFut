const sql = require('mssql');
require('dotenv').config();

console.log("DB_SERVER:", process.env.DB_SERVER);

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, 
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true
  }
};

sql.connect(config, (err) => {
  if (err) console.log(err);
  else console.log('Connected to database!');
});

module.exports = sql;

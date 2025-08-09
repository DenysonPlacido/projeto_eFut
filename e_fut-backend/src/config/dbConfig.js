// //e_fut-backend/src/config/dbConfig.js

// const sql = require('mssql');
// require('dotenv').config();

// console.log("DB_SERVER:", process.env.DB_SERVER);

// const config = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   server: process.env.DB_SERVER, 
//   database: process.env.DB_NAME,
//   options: {
//     encrypt: true,
//     enableArithAbort: true,
//     trustServerCertificate: true
//   }
// };

// sql.connect(config, (err) => {
//   if (err) console.log(err);
//   else console.log('Connected to database!');
// });

// module.exports = sql;


const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Pegando valores do .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Criando o cliente do Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

console.log("✅ Conectado ao Supabase:", supabaseUrl);

module.exports = supabase;


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const playerRoutes = require('./routes/playerRoutes');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');

dotenv.config(); // Carrega variáveis do .env

const app = express();
const port = process.env.PORT || 3000;

// 🌐 Middleware global
app.use(cors());
app.use(express.json());

// 📦 Rotas
app.use('/api/players', playerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

// 🛠️ Rota de teste
app.get('/', (req, res) => {
  res.send('🚀 API do e-Fut está rodando!');
});

// 🧠 Tratamento de erro genérico
app.use((err, req, res, next) => {
  console.error('Erro interno:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// 🚀 Inicialização do servidor
app.listen(port, () => {
  console.log(`✅ Servidor rodando na porta ${port}`);
});
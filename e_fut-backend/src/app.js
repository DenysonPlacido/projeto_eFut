// src/app.js

const express = require('express');
const cors = require('cors');
const playerRoutes = require('./routes/playerRoutes');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes'); 

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', playerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes); 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

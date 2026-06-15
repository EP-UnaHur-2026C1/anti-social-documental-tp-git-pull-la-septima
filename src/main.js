const express = require('express');
const app = express();
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3001;
const  connectDB  = require('./config/db');

dotenv.config();
connectDB();

app.use(express.json());

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});
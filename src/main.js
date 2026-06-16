const express = require('express');
const app = express();
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3001;
const  connectDB  = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});
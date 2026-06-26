const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const connectDB = require('./config/db');
const redisClient = require('./config/redis');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const tagRoutes = require('./routes/tagRoutes');
const postImageRoutes = require('./routes/post-ImageRoutes');
const corsOptions = { origin: process.env.ALLOWED_ORIGINS || 'http://localhost:3000',optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/post-images', postImageRoutes);

connectDB().then(async () => {
  await redisClient.connect();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});
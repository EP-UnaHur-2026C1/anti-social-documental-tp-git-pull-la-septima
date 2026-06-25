const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3001;
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const tagRoutes = require('./routes/tagRoutes');
const postImageRoutes = require('./routes/post-ImageRoutes');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/post-images', postImageRoutes);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  }
}, { 
  // timestamps agrega automáticamente createdAt y updatedAt a cada documento
  timestamps: true 
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

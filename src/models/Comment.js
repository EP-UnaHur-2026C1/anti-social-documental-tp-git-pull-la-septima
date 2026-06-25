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
  },
  visible: {
  type: Boolean,
  default: true
}
}, { 
  // timestamps agrega automáticamente createdAt y updatedAt a cada documento
  timestamps: true ,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

commentSchema.virtual('antiguedadMes').get(function() {
  if (!this.createdAt) return 0;
  const now = new Date();
  const created = new Date(this.createdAt);
  let months = (now.getFullYear() - created.getFullYear()) * 12 + (now.getMonth() - created.getMonth());
  if (now.getDate() < created.getDate()) {
    months--;
  }
  return months < 0 ? 0 : months;
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

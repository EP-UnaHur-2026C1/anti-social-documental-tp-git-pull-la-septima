const Comment = require('../models/Comment');

const createComment = async (req, res) => {
  try {
    const { texto, user, post } = req.body;
    
    if (!texto || !user || !post) {
      return res.status(400).json({ message: 'texto, user y post son campos obligatorios.' });
    }
    const comment = await Comment.create({ texto, user, post });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createComment
};
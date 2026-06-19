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

const updateComment = async (req, res) => {
  try {
    const {texto} = req.body;
    const id = req.params.id;

    if (!texto) {
      res.status(400).json({message: "El texto no puede estar vacio"})
      return
    }
    const comment = await Comment.findByIdAndUpdate(id, {texto}, { new: true, runValidators: true })

    if (!comment) {
      res.status(404).json({message: `Comentario con id ${id} no encontrado`})
      return
    }

    res.status(200).json(comment)
    return
  } catch (err) {
    res.status(500).json({ message : err.message })
    return 
  }
}

module.exports = {
  createComment, updateComment
};
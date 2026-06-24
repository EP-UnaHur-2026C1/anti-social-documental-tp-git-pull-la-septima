const Comment = require('../models/Comment');

const createComment = async (req, res) => {
  try {
    const { texto } = req.body;
    const { id_user, id_post } = req.params;
    await Comment.create({
            texto,
            user: id_user,
            post: id_post,
            visible: true
        });
    res.status(201).json({ message: 'El comentario fue agregado correctamente' });

  } catch (error) {
    res.status(500).json({ message: `${err}` });
  }
};

const updateComment = async (req, res) => {
  try {
    const { texto } = req.body;
    const comment = await Comment.findByIdAndUpdate(req.params.id, { texto }, { new: true });
    res.status(200).json({ message: `El Comentario : ${comment.texto} actualizado` });
    
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
}



module.exports = {
  createComment, updateComment
};
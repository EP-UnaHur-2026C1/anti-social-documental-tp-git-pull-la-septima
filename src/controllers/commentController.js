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
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
};

const getCommentsByPost = async (req, res) => {
    try {
        const { id_post } = req.params;
        const limitMonths = parseInt(process.env.COMMENT_VISIBILITY_MONTHS) || 6;
        const comments = await Comment.find({ post: id_post, visible: true });
        const filteredComments = comments.filter(comment => comment.antiguedadMes < limitMonths);
        res.status(200).json(filteredComments);
    } catch (err) {
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
};

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: `El Comentario : ${comment.texto} eliminado` });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
};

const updateVisibilityByMonth = async (req, res) => {
    try {
        const { mes } = req.body;
        const comments = await Comment.find();
        const promise = comments.map(async (comment) => {
            const visible = mes > comment.antiguedadMes;
            return Comment.findByIdAndUpdate(comment._id, { visible });
        });
        await Promise.all(promise);
        res.status(200).json({ message: 'Comentarios actualizados' });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
};

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
};

const getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
};

module.exports = {
  createComment, 
  updateComment, 
  getCommentsByPost, 
  deleteComment, 
  updateVisibilityByMonth, 
  getAllComments, 
  getCommentById
};
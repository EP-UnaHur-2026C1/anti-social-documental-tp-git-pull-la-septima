const { validateObjectId, validateSchema } = require('./generic.middleware');
const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');
const { commentSchema, updateVisibilitySchema } = require('../schemas/commentSchema');

const validateCommentId = validateObjectId(Comment);
const validateSchemaComment = validateSchema(commentSchema);
const validateSchemaUpdateVisibility = validateSchema(updateVisibilitySchema);
const validateCommentUserId = validateObjectId(User, 'id_user');
const validateCommentPostId = validateObjectId(Post, 'id_post');

const validateCommentOwnership = async (req, res, next) => {
    try {
        const { id, id_user, id_post } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: `Comentario ${id} no encontrado` });
        }
        if (id_user && comment.user.toString() !== id_user) {
            return res.status(403).json({ message: 'El comentario no pertenece al usuario indicado' });
        }
        if (id_post && comment.post.toString() !== id_post) {
            return res.status(403).json({ message: 'El comentario no pertenece al post indicado' });
        }
        req.comment = comment;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const validateCommentVisible = (req, res, next) => {
    if (req.comment && req.comment.visible === false) {
        return res.status(403).json({ message: 'El comentario no esta visible' });
    }
    next();
};

module.exports = {
    validateCommentId,
    validateSchemaComment,
    validateSchemaUpdateVisibility,
    validateCommentUserId,
    validateCommentPostId,
    validateCommentOwnership,
    validateCommentVisible
};
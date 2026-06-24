const mongoose = require('mongoose');
const { validateObjectId, validateSchema } = require('./generic.middleware');
const Post = require('../models/Post');
const Tag = require('../models/Tag');
const { postSchema } = require('../schemas/postSchema');

const validatePostId = validateObjectId(Post, 'id_post');
const validateSchemaPost = validateSchema(postSchema);

const validatePostByUser = async (req, res, next) => {
    try {
        const { id_post, id } = req.params;
        const post = await Post.findOne({ _id: id_post, user: id });
        if (!post) {
            return res.status(404).json({ message: `El post ${id_post} no le pertenece al usuario ${id}` });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
};

const validatePostTagsExist = async (req, res, next) => {
    try {
        const { tags } = req.body;
        if (!tags || tags.length === 0) return next();
        for (const tagId of tags) {
            if (!mongoose.isValidObjectId(tagId)) {
                return res.status(400).json({ message: `El tag ${tagId} no es un ObjectId válido` });
            }
            const exists = await Tag.findById(tagId);
            if (!exists) {
                return res.status(404).json({ message: `El tag ${tagId} no existe` });
            }
        }
        next();
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
};

module.exports = {
    validatePostId,
    validateSchemaPost,
    validatePostByUser,
    validatePostTagsExist
};

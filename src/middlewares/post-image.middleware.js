const { validateObjectId, validateSchema } = require('./generic.middleware');
const PostImage = require('../models/Post-Image');
const { postImageSchema } = require('../schemas/post-image.schema');

const validatePostImageId = validateObjectId(PostImage, 'id_pi');
const validateSchemaPostImage = validateSchema(postImageSchema);

const validatePostImageByPost = async (req, res, next) => {
    try {
        const { id_post, id_pi } = req.params;
        const image = await PostImage.findOne({ _id: id_pi, id_post });
        if (!image) {
            return res.status(404).json({ message: `La imagen ${id_pi} no pertenece al post ${id_post}` });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
};

module.exports = {
    validatePostImageId,
    validateSchemaPostImage,
    validatePostImageByPost
};
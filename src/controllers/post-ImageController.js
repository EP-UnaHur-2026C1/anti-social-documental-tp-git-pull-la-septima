const PostImage = require("../models/Post-Image")   

const createPostImage = async (req, res) => {
    try {
        const { url_image, id_post } = req.body;
        const postImage = await PostImage.create({ url_image, id_post });
        res.status(201).json(postImage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createPostImage
}
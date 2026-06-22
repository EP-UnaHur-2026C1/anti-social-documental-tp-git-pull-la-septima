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

const getPostImagesByPostId = async (req, res) => {
    try {
        const { id_post } = req.params; 
        const postImages = await PostImage.findById({ id_post });
        if(!postImages) {
            return res.status(404).json({ message: `No se encontraron imágenes para el post con id ${id_post}` });
        }
        res.status(200).json(postImages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



module.exports = {
    createPostImage,
    getPostImagesByPostId
}
const PostImage = require("../models/Post-Image")   

const createPostImage = async (req, res) => {
    try {
        const { id_post } = req.params;
        const { url_image } = req.body
        const postImage = await PostImage.create({ url_image, id_post });
        res.status(201).json(postImage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPostImages = async (req, res) => {
    try {
        const { id_post } = req.params;
        const images = await PostImage.find({ id_post });
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
};

const getPostImageById = async (req, res) => {
    try {
        const { id_post, id_pi } = req.params;
        const image = await PostImage.findOne({ _id: id_pi, id_post });
        res.status(200).json(image);
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
};

const deletePostImage = async (req, res) => {
    try {
        const { id_pi } = req.params;
        const postImage = await PostImage.findByIdAndDelete(id_pi);
        if (!postImage) {
            return res.status(404).json({ message: 'Imagen de post no encontrada' });
        }
        res.status(200).json({ message: 'Imagen de post eliminada' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePostImage = async (req, res) => {
    try {
        const { id_post, id_pi } = req.params;
        const { url_image } = req.body;
        const postImage = await PostImage.findOneAndUpdate(
            { _id: id_pi, id_post },
            { url_image },
            { new: true }
        ); 
        if (!postImage) {
            return res.status(404).json({ message: 'Imagen de post no encontrada' });
        }
        res.status(200).json(postImage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
}

module.exports = {
    createPostImage,
    getPostImageById,
    getPostImages,
    deletePostImage,
    updatePostImage
}
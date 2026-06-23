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

const getPostImageByPostId = async (req, res) => {
    try {
        const { id_post } = req.params; 
        const postImages = await PostImage.findById({ where: { id_post } });
        if(!postImages) {
            return res.status(404).json({ message: `No se encontraron imágenes para el post con id ${id_post}` });
        }
        res.status(200).json(postImages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPostImages = async (req, res) => { 
    try{
        const postImages = await PostImage.find();
        res.status(200).json(postImages);   
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deletePostImage = async (req, res) => {
    try {
        const postImage = await PostImage.findByIdAndDelete(req.params.id);
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
        const postImage = await PostImage.findByIdAndUpdate(
            req.params.id,
            req.body,
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
    getPostImageByPostId,
    getPostImages,
    deletePostImage,
    updatePostImage
}
const Post = require('../models/Post');

const createPost = async (req, res) => {
    try {
        const { texto, tags } = req.body;
        const user = req.params.id;
        const postCreado = await Post.create({
            texto,
            user,
            tags: tags || [],
            fechaPublicacion: new Date()
        });
        const resultado = await Post.findById(postCreado._id)
            .populate('user')
            .populate('tags');
        res.status(201).json(resultado);
    } catch (err) {
        res.status(500).json({ message: `${err.message}` });
    }
};

const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id_post);
        res.status(200).json({ message: 'Post eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ message: `${err.message}` });
    }
};

const getPosts = async (_, res) => {
    try {
        const posts = await Post.find().populate('user').populate('tags');
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: `${err.message}` });
    }
};

const getAllPostsByUser = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.id })
            .populate('user')
            .populate('tags');
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: `${err.message}` });
    }
};

const getOnePostByUser = async (req, res) => {
    try {
        const post = await Post.findOne({
            _id: req.params.id_post,
            user: req.params.id
        }).populate('user').populate('tags');
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updatePostByUser = async (req, res) => {
    try {
        const { texto, tags } = req.body;
        const update = { texto };
        if (tags) update.tags = tags;
        const post = await Post.findOneAndUpdate(
            { _id: req.params.id_post, user: req.params.id },
            update,
            { new: true }
        ).populate('user').populate('tags');
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createPost,
    deletePost,
    getPosts,
    getAllPostsByUser,
    getOnePostByUser,
    updatePostByUser
};

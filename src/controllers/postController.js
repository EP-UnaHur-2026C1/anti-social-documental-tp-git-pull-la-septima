const Post = require("../models/Post")

const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ message:err.message });
    }
};



module.exports = { 
    createPost 
}

const Tag = require("../models/Tag");

const createTag = async (req, res) => {
    try {
        const tag = await Tag.create(req.body);
        res.status(201).json(tag);
    } catch (err) {
        res.status(400).json({ message:err.message });
    }
};

module.exports = {
    createTag
}
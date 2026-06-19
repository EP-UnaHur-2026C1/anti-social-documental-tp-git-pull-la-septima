const Tag = require("../models/Tag");

const createTag = async (req, res) => {
    try {
        const tag = await Tag.create(req.body);
        res.status(201).json(tag);
    } catch (err) {
        res.status(500).json({ message:err.message });
    }
};

const deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findByIdAndDelete(req.params.id);
        if (!tag) {
            return res.status(404).json({ message: 'Tag no encontrado' });
        }
        res.status(200).json({ message: 'Tag eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createTag,
    deleteTag,
}
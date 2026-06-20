const Tag = require("../models/Tag");

const createTag = async (req, res) => {
    try {
        const tag = await Tag.create(req.body);
        res.status(201).json(tag);
    } catch (error) {
        res.status(500).json({ message: error.message });
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

const getTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTagById = async (req, res) => {
    try {
        const id = req.params.id;
        const tag = await Tag.findById(id)
        if (!tag) {
            res.status(404).json({message : `No se encontro un tag con id ${id}`})
        }
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
};

const updateTag = async (req, res) => {
    try {
        const tag = await Tag.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!tag) {
            return res.status(404).json({ message: 'Tag no encontrado' });
        }
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTag,
    deleteTag,
    getTags,
    getTagById,
    deleteTag,
    updateTag
}

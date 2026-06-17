const User = require('../models/User');    

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);   
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({message : `No se encontro un usuario con id ${id}`})
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message : err.message });
    }
}

module.exports = {
    createUser, getUsers, getUserById
};
const mongoose = require('mongoose');

const validateObjectId = (Model) => {
    return async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ message: 'El id no es un ObjectId válido' });
            }
            const instance = await Model.findById(id);
            if (!instance) {
                return res.status(404).json({ message: `El id ${id} no fue encontrado` });
            }
            next();
        } catch (err) {
            res.status(500).json({ message: `${err}` });
        }
    };
};
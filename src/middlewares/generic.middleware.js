const mongoose = require('mongoose');

const validateObjectId = (Model) => {
    return async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!mongoose.isValidObjectId(id)) {
                res.status(400).json({ message: 'El id no es un ObjectId válido' });
                return;
            }
            const instance = await Model.findById(id);
            if (!instance) {
                res.status(404).json({ message: `El id ${id} no fue encontrado` });
                return;
            }
            next();
        } catch (err) {
            res.status(500).json({ message: `${err}` });
        }
    };
};

const validateSchema = (Schema) => {
    return (req, res, next) => {
        const { error } = Schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMsj = error.details.map(e => e.message);
            res.status(400).json(errorMsj);
            return
        }
        next();
    };
};

module.exports = {
    validateObjectId,
    validateSchema
};

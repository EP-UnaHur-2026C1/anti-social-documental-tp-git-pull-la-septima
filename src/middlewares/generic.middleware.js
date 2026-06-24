const mongoose = require('mongoose');

const validateObjectId = (Model, paramName = 'id') => {
    return async (req, res, next) => {
        try {
            const id = req.params[paramName];
            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ message: `El ${paramName} no es un ObjectId válido` });
            }
            const instance = await Model.findById(id);
            if (!instance) {
                return res.status(404).json({ message: `El ${paramName} ${id} no fue encontrado` });
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
            return res.status(400).json(errorMsj);
        }
        next();
    };
};

module.exports = {
    validateObjectId,
    validateSchema
};

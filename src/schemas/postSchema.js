const Joi = require('joi');

const postSchema = Joi.object({
    texto: Joi.string()
        .max(225)
        .required()
        .messages({
            'string.empty': 'El texto no puede ser vacio',
            'string.max': 'El texto no puede superar los 225 caracteres',
            'any.required': 'El texto es obligatorio'
        }),
    tags: Joi.array()
        .items(
            Joi.string().hex().length(24).messages({
                'string.hex': 'Cada tag debe ser un ObjectId válido',
                'string.length': 'Cada tag debe tener 24 caracteres'
            })
        )
        .messages({
            'array.base': 'tags debe ser un array'
        })
});

module.exports = { postSchema };

const Joi = require('joi');

const postImageSchema = Joi.object({
    url_image: Joi.string()
        .uri()
        .required()
        .messages({
            'string.empty': 'La url de la imagen no puede ser vacia',
            'string.uri': 'La url de la imagen debe ser una URL válida',
            'any.required': 'La url de la imagen es obligatoria'
        })
});

module.exports = { postImageSchema };
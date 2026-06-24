const { validateObjectId, validateSchema } = require('./generic.middleware');
const Tag = require('../models/Tag');
const { tagSchema } = require('../schemas/tagSchema');

const validateTagId = validateObjectId(Tag);
const validateSchemaTag = validateSchema(tagSchema);

module.exports = {
    validateTagId,
    validateSchemaTag
};
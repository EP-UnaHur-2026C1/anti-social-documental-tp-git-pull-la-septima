const { validateObjectId, validateSchema } = require('./generic.middleware');
const User = require('../models/User');
const { userSchema } = require('../schemas/user.schema');

const validateUserId = validateObjectId(User);
const validateSchemaUser = validateSchema(userSchema);

module.exports = {
    validateUserId,
    validateSchemaUser
};
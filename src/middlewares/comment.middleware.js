const { validateObjectId, validateSchema } = require('./generic.middleware');
const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');
const { commentSchema, updateVisibilitySchema } = require('../schemas/comment.schema');

const validateCommentId = validateObjectId(Comment);
const validateSchemaComment = validateSchema(commentSchema);
const validateSchemaUpdateVisibility = validateSchema(updateVisibilitySchema);
const validateCommentUserId = validateObjectId(User, 'id_user');
const validateCommentPostId = validateObjectId(Post, 'id_post');

module.exports = {
    validateCommentId,
    validateSchemaComment,
    validateSchemaUpdateVisibility,
    validateCommentUserId,
    validateCommentPostId
};
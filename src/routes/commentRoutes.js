const { Router } = require('express');
const {
    createComment,
    getAllComments,
    getCommentsByPost,
    getCommentById,
    updateComment,
    deleteComment,
    updateVisibilityByMonth
} = require('../controllers/commentController');
const {
    validateCommentId,
    validateSchemaComment,
    validateSchemaUpdateVisibility,
    validateCommentUserId,
    validateCommentPostId,
    validateCommentOwnership
} = require('../middlewares/comment.middleware');
const router = Router();

router.post('/user/:id_user/post/:id_post', validateSchemaComment, validateCommentUserId, validateCommentPostId, createComment);
router.get('/', getAllComments);
router.get('/post/:id_post', validateCommentPostId, getCommentsByPost);
router.get('/:id', validateCommentId, getCommentById);
router.put(
    '/user/:id_user/post/:id_post/:id',
    validateCommentUserId,
    validateCommentPostId,
    validateCommentOwnership,
    validateSchemaComment,
    updateComment
);
router.delete(
    '/user/:id_user/post/:id_post/:id',
    validateCommentUserId,
    validateCommentPostId,
    validateCommentOwnership,
    deleteComment
);
router.patch('/updateVisibility', validateSchemaUpdateVisibility, updateVisibilityByMonth);

module.exports = router;

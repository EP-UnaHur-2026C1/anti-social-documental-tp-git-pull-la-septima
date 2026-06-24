const { Router } = require('express');
const {
    createComment,
    getCommentsByPost,
    updateComment,
    deleteComment
} = require('../controllers/commentController');
const {
    validateCommentId,
    validateSchemaComment,
    validateSchemaUpdateVisibility,
    validateCommentUserId,
    validateCommentPostId
} = require('../middlewares/comment.middleware');
const router = Router();

router.post('/user/:id_user/post/:id_post', validateSchemaComment, validateCommentUserId, validateCommentPostId, createComment);
router.get('/post/:id_post', validateCommentPostId, getCommentsByPost);
router.put('/update/:id', validateSchemaComment, validateCommentId, updateComment);
router.delete('/delete/:id', validateCommentId, deleteComment);

module.exports = router;

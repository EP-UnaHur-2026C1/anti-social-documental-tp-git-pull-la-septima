const { Router } = require('express');
const {
    createComment,
    getAllComments,
    getCommentsByPost,
    updateComment,
    deleteComment,
    updateVisibilityByMonth
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
router.get('/', getAllComments);
router.get('/post/:id_post', validateCommentPostId, getCommentsByPost);
router.put('/update/:id', validateSchemaComment, validateCommentId, updateComment);
router.delete('/delete/:id', validateCommentId, deleteComment);
router.patch('/updateVisibility', validateSchemaUpdateVisibility, updateVisibilityByMonth);

module.exports = router;

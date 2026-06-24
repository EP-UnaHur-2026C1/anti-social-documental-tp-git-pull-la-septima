const { Router } = require('express');
const {
    createPost,
    deletePost,
    getPosts,
    getAllPostsByUser,
    getOnePostByUser,
    updatePostByUser
} = require('../controllers/postController');
const {
    validateSchemaPost,
    validatePostId,
    validatePostByUser,
    validatePostTagsExist
} = require('../middlewares/post.middleware');
const { validateUserId } = require('../middlewares/user.middleware');

const router = Router();

router.post('/:id', validateSchemaPost, validateUserId, validatePostTagsExist, createPost);
router.delete('/:id_post', validatePostId, deletePost);
router.get('/', getPosts);
router.get('/user/:id', validateUserId, getAllPostsByUser);
router.get('/user/:id/post/:id_post', validateUserId, validatePostId, validatePostByUser, getOnePostByUser);
router.put('/user/:id/post/:id_post', validateSchemaPost, validateUserId, validatePostId, validatePostByUser, validatePostTagsExist, updatePostByUser);

module.exports = router;

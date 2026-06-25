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
const { checkCache } = require('../middlewares/cache.middleware');

const router = Router();
const cacheKeyAllPosts = () => 'posts:all';
const cacheKeyPostById = (req) => `posts:${req.params.id_post}`;
const cacheKeyPostsByUser = (req) => `posts:user:${req.params.id}`;

router.post('/user/:id', validateSchemaPost, validateUserId, validatePostTagsExist, createPost);
router.delete('/:id_post', validatePostId, deletePost);
router.get('/', checkCache(cacheKeyAllPosts), getPosts);
router.get('/user/:id', checkCache(cacheKeyPostsByUser), validateUserId, getAllPostsByUser);
router.get('/user/:id/post/:id_post', checkCache(cacheKeyPostById), validateUserId, validatePostId, validatePostByUser, getOnePostByUser);
router.put('/user/:id/post/:id_post', validateSchemaPost, validateUserId, validatePostId, validatePostByUser, validatePostTagsExist, updatePostByUser);

module.exports = router;

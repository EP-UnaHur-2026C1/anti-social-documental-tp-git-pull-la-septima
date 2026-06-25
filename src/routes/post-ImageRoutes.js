const { Router } = require('express');
const {
    createPostImage,
    getPostImages,
    getPostImageById,
    updatePostImage,
    deletePostImage
} = require('../controllers/post-ImageController');
const {
    validatePostImageId,
    validateSchemaPostImage,
    validatePostImageByPost
} = require('../middlewares/post-image.middleware');
const { validateUserId } = require('../middlewares/user.middleware');
const { validatePostId, validatePostByUser } = require('../middlewares/post.middleware');

const router = Router();

const validateIdsAndPostByUser = [validateUserId, validatePostId, validatePostByUser];

router.post('/user/:id/post/:id_post/images', validateSchemaPostImage, validateIdsAndPostByUser, createPostImage);
router.get('/user/:id/post/:id_post/images', validateIdsAndPostByUser, getPostImages);
router.get('/user/:id/post/:id_post/images/:id_pi', validateIdsAndPostByUser, validatePostImageId, validatePostImageByPost, getPostImageById);
router.put('/user/:id/post/:id_post/images/:id_pi', validateSchemaPostImage, validateIdsAndPostByUser, validatePostImageId, validatePostImageByPost, updatePostImage);
router.delete('/user/:id/post/:id_post/images/:id_pi', validateIdsAndPostByUser, validatePostImageId, validatePostImageByPost, deletePostImage);

module.exports = router;
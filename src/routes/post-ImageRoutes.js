const {Router} = require('express');
const { createPostImage,getPostImageByPostId,getPostImages,deletePostImage} = require('../controllers/post-ImageController');

const router = Router();

router.post('/', createPostImage);
router.get('/post/:id_post', getPostImageByPostId);
router.get('/', getPostImages);
router.delete('/:id', deletePostImage);

module.exports = router;
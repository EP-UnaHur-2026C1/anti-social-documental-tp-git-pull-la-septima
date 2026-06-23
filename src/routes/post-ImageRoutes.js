const {Router} = require('express');
const { createPostImage,getPostImageByPostId,getPostImages,deletePostImage,updatePostImage} = require('../controllers/post-ImageController');

const router = Router();

router.post('/', createPostImage);
router.get('/post/:id_post', getPostImageByPostId);
router.get('/', getPostImages);
router.delete('/:id', deletePostImage);
router.put('/:id', updatePostImage);
module.exports = router;
const {Router} = require('express');
const { createPostImage,getPostImageByPostId,getPostImages} = require('../controllers/post-ImageController');

const router = Router();

router.post('/', createPostImage);
router.get('/post/:id_post', getPostImageByPostId);
router.get('/', getPostImages);

module.exports = router;
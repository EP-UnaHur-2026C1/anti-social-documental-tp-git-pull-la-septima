const {Router} = require('express');
const { createPostImage,getPostImagesByPostId } = require('../controllers/post-ImageController');

const router = Router();

router.post('/', createPostImage);
router.get('/post/:id_post', getPostImagesByPostId);

module.exports = router;
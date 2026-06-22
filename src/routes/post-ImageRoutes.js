const {Router} = require('express');
const { createPostImage } = require('../controllers/post-ImageController');

const router = Router();

router.post('/', createPostImage);

module.exports = router;
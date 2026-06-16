const {Router} = require('express');
const { createPost } = require('../controllers/postController');

const router = Router();

router.post('/', createPost);

module.exports = router;
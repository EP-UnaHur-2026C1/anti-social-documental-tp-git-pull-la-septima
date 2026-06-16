const { Router } = require('express');
const { createComment } = require('../controllers/commentController');

const router = Router();

router.post('/', createComment);

module.exports = router;

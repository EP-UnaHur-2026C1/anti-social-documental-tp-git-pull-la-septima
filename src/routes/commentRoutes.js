const { Router } = require('express');
const { createComment, updateComment } = require('../controllers/commentController');

const router = Router();

router.post('/', createComment);
router.put('/:id', updateComment)

module.exports = router;

const {Router} = require('express');
const { createTag, deleteTag } = require('../controllers/tagController');

const router = Router();

router.post('/', createTag);
router.delete('/:id', deleteTag);

module.exports = router;
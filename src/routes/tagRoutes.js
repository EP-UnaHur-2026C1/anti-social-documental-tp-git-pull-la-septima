const {Router} = require('express');
const { createTag, deleteTag, getTags, getTagById } = require('../controllers/tagController');

const router = Router();

router.post('/', createTag);
router.delete('/:id', deleteTag);
router.get('/', getTags);
router.get('/:id', getTagById);

module.exports = router;
const {Router} = require('express');
const { createTag, deleteTag, getTags, getTagById, deleteTag, updateTag } = require('../controllers/tagController');

const router = Router();

router.post('/', createTag);
router.get('/', getTags);
router.get('/:id', getTagById);
router.delete('/:id', deleteTag);
router.put('/:id', updateTag);

module.exports = router;
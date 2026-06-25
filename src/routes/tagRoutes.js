const {Router} = require('express');
const { createTag, deleteTag, getTags, getTagById, updateTag } = require('../controllers/tagController');
const { validateTagId, validateSchemaTag } = require('../middlewares/tag.middleware');

const router = Router();
router.post('/', validateSchemaTag, createTag);
router.get('/', getTags);
router.get('/:id', validateTagId, getTagById);
router.delete('/:id', validateTagId, deleteTag);
router.put('/:id', validateSchemaTag, validateTagId, updateTag);

module.exports = router;
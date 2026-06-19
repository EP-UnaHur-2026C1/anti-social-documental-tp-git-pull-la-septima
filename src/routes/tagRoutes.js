const {Router} = require('express');
const { createTag } = require('../controllers/tagController');

const router = Router();

router.post('/', createTag);

module.exports = router;
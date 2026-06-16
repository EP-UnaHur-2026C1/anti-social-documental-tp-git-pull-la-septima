const {Router} = require('express');
const { createUser, getUsers } = require('../controllers/userController');

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);

module.exports = router;
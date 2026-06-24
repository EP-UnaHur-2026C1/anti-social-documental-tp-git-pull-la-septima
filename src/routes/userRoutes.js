const {Router} = require('express');
const { createUser, getUsers, getUserById, deleteUser, updateUser } = require('../controllers/userController');
const { validateUserId, validateSchemaUser } = require('../middlewares/user.middleware');

const router = Router();

router.post('/', validateSchemaUser, createUser);
router.get('/', getUsers);
router.get('/:id', validateUserId, getUserById);
router.put('/:id', validateUserId, validateSchemaUser, updateUser);
router.delete('/:id', validateUserId, deleteUser);

module.exports = router;
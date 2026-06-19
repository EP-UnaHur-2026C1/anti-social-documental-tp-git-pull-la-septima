const {Router} = require('express');
const { createUser, getUsers, getUserById, deleteUser } = require('../controllers/userController');

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/id', getUserById);
router.delete('/:id', deleteUser);

module.exports = router;
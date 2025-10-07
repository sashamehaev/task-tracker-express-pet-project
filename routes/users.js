const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/users');

router.get('/users/:id', getUserById);
router.get('/users', getUsers);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);
router.patch('/users/me', updateUser);

module.exports = router;
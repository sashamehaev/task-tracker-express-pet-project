const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUserById,
} = require('../controllers/users');

router.get('/users/:id', getUserById);
router.get('/users', getUsers);
router.post('/users', createUser);

module.exports = router;
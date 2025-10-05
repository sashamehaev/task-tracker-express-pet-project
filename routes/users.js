const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUser,
} = require('../controllers/users');

router.get('/users/:id', getUser);
router.get('/users', getUsers);
router.post('/users', createUser);

module.exports = router;
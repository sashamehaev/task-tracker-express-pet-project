const router = require('express').Router();
const {
  getTasks,
  createTask,
  getTask,
} = require('../controllers/users');

router.get('/users/:id', getTask);
router.get('/users', getTasks);
router.post('/users', createTask);

module.exports = router;
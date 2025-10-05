const router = require('express').Router();
const {
  getTasks,
  createTask,
  getTask,
} = require('../controllers/tasks');

router.get('/tasks/:id', getTask);
router.get('/tasks', getTasks);
router.post('/tasks', createTask);

module.exports = router;
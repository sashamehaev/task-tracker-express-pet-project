const router = require('express').Router();
const {
  getTasks,
  createTask,
  getTaskById,
} = require('../controllers/tasks');

router.get('/tasks/:id', getTaskById);
router.get('/tasks', getTasks);
router.post('/tasks', createTask);

module.exports = router;
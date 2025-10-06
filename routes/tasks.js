const router = require('express').Router();
const {
  getTasks,
  createTask,
  getTaskById,
  deleteTask
} = require('../controllers/tasks');

router.post('/tasks', createTask);
router.get('/tasks', getTasks);
//router.get('/tasks/:id', getTaskById);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
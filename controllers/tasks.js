const Task = require('../models/task');

module.exports.getTasks = (req, res) => {
  Task.find({})
    .populate('author')
    .then((tasks) => res.send({ data: tasks }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getTask = (req, res) => {
  Task.findById(req.params.id)
    .then((task) => res.send({ data: task }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createTask = (req, res) => {
    const { name, authorId } = req.body;
    Task.create({ name, author: authorId })
        .then(task => res.send({ data: task }))
        .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
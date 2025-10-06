const Task = require('../models/task');

module.exports.getTasks = (req, res) => {
  Task.find({})
    //в populate получим подробную инфу про автора
    .populate('author')
    .then((tasks) => res.send({ data: tasks }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getTask = (req, res) => {
  Task.findById(req.params.id)
    //в populate получим подробную инфу про автора
    .populate('author')
    .then((task) => res.send({ data: task }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createTask = (req, res) => {
  const { title, text, author } = req.body;
  Task.create({ title, text, author: author })
    .then(task => res.send({ data: task }))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введены некорректные данные для карточки' }); 
        return;
      }
      res.status(500).send({ message: err })
    });
};
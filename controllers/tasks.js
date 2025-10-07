const Task = require('../models/task');

module.exports.getTasks = (req, res) => {
  Task.find({})
    //с помощью populate вместо id автора увидим все его поля
    .populate('author')
    .then((tasks) => res.send({ data: tasks }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getTaskById = (req, res) => {
  Task.findById(req.params.id)
    //с помощью populate вместо id автора увидим все его поля
    .populate('author')
    .then(task => {
      if (!task) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: task })
    })
    .catch(err => {
      if (err.name === 'CastError') { 
        res.status(400).send({ message: 'Поле Id задано некорректно' }); 
        return; 
      }
      res.status(500).send({ message: err })
    });
};

module.exports.createTask = (req, res) => {
  const { title, text } = req.body;
  Task.create({ title, text, author: req.user._id })
    .then(task => res.send({ data: task }))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введены некорректные данные для карточки' }); 
        return;
      }
      res.status(500).send({ message: err })
    });
};

module.exports.deleteTask = (req, res) => { 
  Task.findByIdAndDelete(req.params.id) 
    .then(task => { 
      if (!task) { 
        res.status(404).send({ message: 'Задача не найдена' }); 
        return; 
      }
      res.status(204).send({ data: task }); 
    }) 
    .catch(err => { 
      if (err.name === 'CastError') { 
        res.status(400).send({ message: 'Поле Id задано некорректно' }); 
        return; 
      } 
      res.status(500).send({ message: err.message }); 
    }); 
};
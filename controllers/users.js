const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' }); 
        return;
      }
      res.send({ data: user });
    })
    .catch(err => {
      if (err.name === 'CastError') { 
        res.status(400).send({ message: 'Поле Id заданно некорректно' }); 
        return; 
      }
      res.status(500).send({ message: err });
    });
};

module.exports.createUser = (req, res) => {
  const { name } = req.body;
  User.create({ name })
    .then(user => res.status(201).send({ data: user }))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введены некорректные данные для пользователя' }); 
        return;
      }
      res.status(500).send({ message: err })
    });
};
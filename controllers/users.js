const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
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
      res.status(500).send({ message: err.messager });
    });
};

module.exports.createUser = (req, res) => {
  const { email, password } = req.body;

  // хэшируем пароль
  bcrypt.hash(password, 10)
    .then(hash => User.create({
      email: email,
      password: hash,
    }))
    .then(user => res.status(201).send({ 
      _id: user._id,
      email: user.email, 
    }))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введены некорректные данные для пользователя' }); 
        return;
      }
      res.status(500).send({ message: err.message })
    });  
};

module.exports.updateUser = (req, res) => { 
  const { name } = req.body; 
 
  User.findByIdAndUpdate(req.user._id, { name: name }, { new: true, runValidators: true }) 
    .then(user => res.send({ data: user })) 
    .catch(err => {
      if (err.name === 'ValidationError' || err.name === 'CastError') { 
        res.status(400).send({ message: 'Введены некорректные данные для пользователя' }); 
        return; 
      } 
      res.status(500).send({ message: err.message }); 
    }); 
};

module.exports.deleteUser = (req, res) => { 
  User.findByIdAndDelete(req.params.id) 
    .then(user => { 
      if (!user) { 
        res.status(404).send({ message: 'Пользователь не найден' }); 
        return; 
      }
      res.status(204).send({ data: user }); 
    }) 
    .catch(err => { 
      if (err.name === 'CastError') { 
        res.status(400).send({ message: 'Поле Id задано некорректно' }); 
        return; 
      } 
      res.status(500).send({ message: err.message }); 
    }); 
};
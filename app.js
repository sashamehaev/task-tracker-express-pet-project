const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/tasksdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => { 
  req.user = { 
    _id: '68e29447e0d1f5967cd2ef0e', 
  }; 
 
  next(); 
});

app.use(require('./routes/tasks'));
app.use(require('./routes/users'));


app.use((req, res) => { 
  res.status(404).send({ message: 'Страницы не существует' }); 
});

app.listen(PORT, () => {

});

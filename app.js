const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/tasksdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use(require('./routes/tasks'));
app.use(require('./routes/users'));


app.use((req, res) => { 
  res.status(404).send({ message: 'Страницы не существует' }); 
});

app.listen(PORT, () => {

});

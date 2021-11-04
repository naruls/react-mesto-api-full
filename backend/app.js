const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const { Login, User } = require('./middlewares/validator');
require('dotenv').config();

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://kirillnihaenkonaruls.nomoredomains.icu',
    'https://api.kirillnihaenkonaruls.nomoredomains.icu,
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};


const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
});

app.use('*', cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);

app.post('/signin', Login, login);
app.post('/signup', User, createUser);

app.use('/', auth, users);

app.use('/', auth, cards);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); //eslint-disable-line
});

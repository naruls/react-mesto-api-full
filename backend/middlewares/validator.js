const { celebrate, Joi } = require('celebrate');

const result = new RegExp('^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?'); //eslint-disable-line

const Url = (value) => {
  if (result.test(value)) {
    return value;
  }
  throw new Error('Некорректный Url');
};

const Id = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
});

const Login = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const Card = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(result).required(),
  }),
});

const User = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(20),
    avatar: Joi.string().custom(Url),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const UpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(20),
  }),
});

const Avatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(Url).required(),
  }),
});

module.exports = {
  Id,
  Login,
  Card,
  User,
  UpdateUser,
  Avatar,
};

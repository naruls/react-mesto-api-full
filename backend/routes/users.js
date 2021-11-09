const user = require('express').Router();
const { Id, UpdateUser, Avatar } = require('../middlewares/validator');
const {
  getUsers,
  getCurrentUser,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

user.get('/users', getUsers);
user.get('/users/me', getUser);
user.get('/users/:_id', getCurrentUser);
user.patch('/users/me', UpdateUser, updateUser);
user.patch('/users/me/avatar', Avatar, updateAvatar);

module.exports = user;

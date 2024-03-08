const User = require('./user/userModel');
const Logger = require('./logger/logger');

exports.db = {
  User: User,
  Logger: Logger,
};

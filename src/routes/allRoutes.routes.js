const userRoute = require('./User/user.routes');

// Admin Routes
const log = require('./Admin/log.routes');

exports.allRoute = {
  userRoute: userRoute,
  admin: {
    log: log,
  },
};

import userRoute from './User/user.routes';
import log from './Admin/log.routes';

// Admin Routes

export const allRoute = {
  userRoute: userRoute,
  admin: {
    log: log,
  },
};

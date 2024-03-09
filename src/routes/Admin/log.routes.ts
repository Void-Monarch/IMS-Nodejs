import express from 'express';
import authController from '../../middleware/authController';
import logController from '../../controllers/admin/logController';

const router = express.Router();

router.use(
  authController.isLoggedIn,
  authController.protect,
  authController.restrictTo('admin'),
);

router.route('/').get(logController.getAllLogs)

router.route('/user/:id').get(logController.getLogsByUser)

router.route('/ip/:ip').get(logController.getLogsByIp)



export default router;

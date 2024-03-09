import validator from 'validator';
import mongoose, { QueryOpThatReturnsDocument } from 'mongoose';

import catchAsync from '../../utils/catchAsync';
import AppError from '../../utils/appError';
import APIFeatures from '../../utils/apiFeatures';
import filterObj from '../../helpers/filterObj';
import RESPONSE from '../../helpers/response';
import { db } from '../../models/db';
import { NextFunction, RequestHandler, Request , Response } from 'express';

export const getAllLogs : RequestHandler = catchAsync(async (req : Request, res : Response, next : NextFunction) : Promise<any> => {
  const features = new APIFeatures(db.Logger.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const logs = await features.query;

  if (!logs || logs.length === 0) {
    return next(new AppError('No logs found', 404, res));
  }

  RESPONSE.success(res, 10100, logs, 200);
});

export const getLogsByUser : RequestHandler = catchAsync(async (req :Request, res :Response, next :NextFunction) : Promise<any> => {
  const features = new APIFeatures(
    db.Logger.find({ user: req.params.id }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const logs = await features.query;

  if (!logs || logs.length === 0) {
    return next(new AppError('No logs found', 404, res));
  }

  RESPONSE.success(res, 10100, logs, 200);
});

export const getLogsByIp :RequestHandler = catchAsync(async (req :Request, res:Response, next :NextFunction) : Promise<any> => {
  // IP address validation
  if (!validator.isIP(req.params.ip)) {
    return next(new AppError('Invalid IP address', 400, res));
  }
  if (validator.isIP(req.params.ip, 4)) {
    req.params.ip = `::ffff:${req.params.ip}`;
  }

  const features = new APIFeatures(
    db.Logger.find({ ip: req.params.ip }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const logs = await features.query;

  if (!logs || logs.length === 0) {
    return next(new AppError('No logs found', 404, res));
  }

  RESPONSE.success(res, 10100, logs, 200);
});

export default {getAllLogs ,getLogsByIp ,getLogsByUser}
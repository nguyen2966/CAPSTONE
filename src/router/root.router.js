import express from 'express';
import { prisma } from '../common/prisma/connect.prisma.js';
import authRouter from './auth.router.js';
import userRouter from './user.router.js';

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/user', userRouter);

export default rootRouter;
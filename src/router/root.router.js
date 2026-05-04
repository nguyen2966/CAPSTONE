import express from 'express';
import { prisma } from '../common/prisma/connect.prisma.js';
import authRouter from './auth.router.js';
import userRouter from './user.router.js';
import imageRouter from './image.router.js';
import commentsRouter from './comments.router.js';

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/user', userRouter);
rootRouter.use('/image', imageRouter);
rootRouter.use('/comments',commentsRouter);

export default rootRouter;
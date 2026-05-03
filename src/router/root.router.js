import express from 'express';
import { prisma } from '../common/prisma/connect.prisma.js';
import authRouter from './auth.router.js';

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);

export default rootRouter;
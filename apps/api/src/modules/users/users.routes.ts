import express from 'express';
import { getMe, getUserByUsernameController } from './users.controller';

export const usersRouter = express.Router();

usersRouter.get('/me', getMe);
usersRouter.get('/:username', getUserByUsernameController); 
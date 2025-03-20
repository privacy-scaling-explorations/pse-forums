import { Router } from 'express';
import { getCurrentUser } from './me.controller';

const router = Router();

router.get('/', getCurrentUser);

export { router as meRouter }; 
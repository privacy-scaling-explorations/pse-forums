import { Router } from 'express';
import { getAllPosts, getPostById } from './posts.controller';

const router = Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);

export { router as postsRouter }; 
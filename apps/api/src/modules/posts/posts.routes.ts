import { Router } from 'express';
import { getAllPosts, getPostById, toggleReaction } from './posts.controller';

const router = Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/:id/reactions', toggleReaction);

export { router as postsRouter }; 
import { Router } from 'express';
import { getAllPosts, getPostById, addReaction, removeReaction } from './posts.controller';

const router = Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/:id/reactions', addReaction);
router.delete('/:id/reactions/:emoji', removeReaction);

export { router as postsRouter }; 
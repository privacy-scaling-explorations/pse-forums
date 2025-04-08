import { Router } from 'express';
import { getAllPosts, getPostById, toggleReaction, createPostController } from './posts.controller';

const router = Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/:id/reactions', toggleReaction);
router.post('/', createPostController);

export { router as postsRouter }; 
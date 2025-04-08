import { Router } from 'express';
import { getAllCommunities, getCommunityById, getCommunityPosts, joinCommunityController } from './communities.controller';

const router = Router();

// Routes
router.get('/', getAllCommunities);
router.get('/:id', getCommunityById);
router.get('/:id/posts', getCommunityPosts);
router.post('/:id/join', joinCommunityController);

export default router; 
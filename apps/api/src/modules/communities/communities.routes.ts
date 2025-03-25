import { Router } from 'express';
import { getAllCommunities, getCommunityById } from './communities.controller';

const router = Router();


// Routes
router.get('/', getAllCommunities);
router.get('/:id', getCommunityById);

export default router; 
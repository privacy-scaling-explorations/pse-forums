import { Request, Response } from 'express';
import { findAllCommunities, findCommunityById, getPostsByCommunityId, joinCommunity, getUserCommunities } from './communities.service';

export async function getAllCommunities(req: Request, res: Response) {
  try {
    const communities = await findAllCommunities();
    return res.status(200).json(communities);
  } catch (error) {
    console.error('Error fetching communities:', error);
    return res.status(500).json({ error: 'Failed to fetch communities' });
  }
}

export async function getCommunityById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    const community = await findCommunityById(id);
    
    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }
    
    return res.status(200).json(community);
  } catch (error) {
    console.error(`Error fetching community by ID ${req.params.id}:`, error);
    return res.status(500).json({ error: 'Failed to fetch community' });
  }
} 

export async function getCommunityPosts(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    const posts = await getPostsByCommunityId(id);

    return res.status(200).json(posts);
  } catch (error) {
    console.error(`Error fetching community posts by ID ${req.params.id}:`, error);
    return res.status(500).json({ error: 'Failed to fetch community posts' });
  }
}

export async function joinCommunityController(req: Request, res: Response) {
  try {
    const { id: communityId } = req.params;
    const { userId } = req.body;
    
    if (!communityId || !userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Both community ID and user ID are required' 
      });
    }
    
    const result = await joinCommunity(userId, communityId);
    
    if (!result.success) {
      return res.status(400).json(result);
    }
    
    return res.status(200).json(result);
  } catch (error) {
    console.error(`Error joining community ${req.params.id}:`, error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to join community' 
    });
  }
}

export async function getUserCommunitiesController(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const communities = await getUserCommunities(userId);
    return res.status(200).json(communities);
  } catch (error) {
    console.error('Error fetching user communities:', error);
    return res.status(500).json({ error: 'Failed to fetch user communities' });
  }
}
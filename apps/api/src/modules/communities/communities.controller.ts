import { Request, Response } from 'express';
import { findAllCommunities, findCommunityById } from './communities.service';

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
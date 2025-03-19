import { Request, Response } from 'express';
import { getUser } from './me.service';

export async function getCurrentUser(req: Request, res: Response) {
  try {
    const user = await getUser();
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
} 
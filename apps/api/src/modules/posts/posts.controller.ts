import { Request, Response } from 'express';
import { getPosts, getPost } from './posts.service';
import { ZodError } from 'zod';

export async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}

export async function getPostById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id) || id < 1) {
      return res.status(400).json({ 
        error: 'Invalid post ID. Must be a positive number.' 
      });
    }

    const post = await getPost(id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    
    if (error instanceof ZodError) {
      return res.status(400).json({ 
        error: 'Invalid post data',
        details: error.issues 
      });
    }

    res.status(500).json({ error: 'Failed to fetch post' });
  }
} 
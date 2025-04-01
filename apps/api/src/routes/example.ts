import { Router } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();

// Example route that queries Supabase
router.get('/example', async (req, res) => {
  try {
    // Example query to a table named 'example_table'
    const { data, error } = await supabase
      .from('example_table')
      .select('*')
      .limit(10);

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('Error querying Supabase:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 
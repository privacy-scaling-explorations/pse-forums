import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { postsRouter } from './modules/posts/posts.routes';
import { meRouter } from './modules/me/me.routes';
import { badgesRouter } from './modules/badges/badges.routes';
import communitiesRoutes from './modules/communities/communities.routes';
import { usersRouter } from './modules/users/users.routes';
import exampleRoutes from './routes/example';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', exampleRoutes);
app.use('/api/posts', postsRouter);
app.use('/api/me', meRouter);
app.use('/api/badges', badgesRouter);
app.use('/api/communities', communitiesRoutes);
app.use('/api/users', usersRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
}); 
import express from 'express';
import cors from 'cors';
import { postsRouter } from './modules/posts/posts.routes';
import { meRouter } from './modules/me/me.routes';
import { badgesRouter } from './modules/badges/badges.routes';
import communitiesRoutes from './modules/communities/communities.routes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/posts', postsRouter);
app.use('/api/me', meRouter);
app.use('/api/badges', badgesRouter);
app.use('/api/communities', communitiesRoutes);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}); 
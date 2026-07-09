import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Route imports — Firebase Admin only, no MongoDB
import authRouter from './routes/auth.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// ─── Health Check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) =>
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
);

// ─── Routes ────────────────────────────────────────────────────────────────────
// This backend only handles Firebase token verification.
// All data operations (gigs, applications, messages, reviews, community, mentors)
// are performed client-side via the Firebase SDK directly.
app.use('/api/auth', authRouter);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[SERVER ERROR]', err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[SERVER] SCORE backend running on http://localhost:${PORT}`);
  console.log('[SERVER] Using Firebase Admin SDK for auth verification');
});

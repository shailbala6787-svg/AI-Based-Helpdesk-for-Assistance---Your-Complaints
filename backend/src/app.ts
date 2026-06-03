import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authRouter } from './apps/auth/route.js';
import { complaintsRouter } from './apps/complaints/route.js';
import { adminRouter } from './apps/admin/route.js';

const app = express();

const allowedOrigins = [
  'http://localhost:6001',
  'http://127.0.0.1:6001',
  '<DOMAIN_PLACEHOLDER>',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/complaints', complaintsRouter);
app.use('/api/admin', adminRouter);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`ABHAY backend running on port ${config.port}`);
});

export default app;

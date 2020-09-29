import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import taskRoutes from './routes/tasks';
import authRoutes from './routes/auth';
import categoryRoutes from './routes/categories';

dotenv.config();

try {
  createConnection();
} catch (err) {
  console.error(err);
}

const app: Application = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', categoryRoutes);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

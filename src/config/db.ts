import { createConnection } from 'typeorm';

const connectDB = () => {
  createConnection()
    .then(() => console.log('Connected to Postgres'))
    .catch(err => console.log('Database connection error', err));
};

export default connectDB;

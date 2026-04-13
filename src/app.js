//src/app.js

import express from 'express';
import { fileURLToPath } from 'url';
import db from '#config/db.js'; // Ensure this is imported to establish DB connection


console.log('DB Config:', fileURLToPath(import.meta.url)); // Debugging line
const app = express();

db.getConnection()
  .then(() => console.log('✅ Database connected'))
  .catch(err => console.error('❌ DB connection error:', err.message));


app.get('/', (req, res) => {
  res.send('API running 🚀');
});

export default app;
//src/app.js
import express from 'express';
import db from '#config/db.js'; // Ensure this is imported to establish DB connection


const app = express();

db.getConnection()
  .then(() => console.log('✅ Database connected'))
  .catch(err => console.error('❌ DB connection error:', err.message));


app.get('/', (req, res) => {
  res.send('API running 🚀');
});

export default app;
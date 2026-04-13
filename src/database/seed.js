import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '#config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedDir = path.join(__dirname, 'seeders');

// ✅ ensure seeders table exists
const ensureSeedTable = async () => {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS seeders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) UNIQUE,
      run_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

// 🔥 run SQL file
const runSQLFile = async (filePath) => {
  const sql = fs.readFileSync(filePath, 'utf-8');
  const queries = sql
    .split(';')
    .map(q => q.trim())
    .filter(Boolean);

  for (let query of queries) {
    await db.execute(query);
  }
};

// 🚀 main seeder
export const seed = async () => {
  await ensureSeedTable();

  const files = fs.readdirSync(seedDir).sort();

  for (let file of files) {
    // check already executed
    const [rows] = await db.execute(
      'SELECT * FROM seeders WHERE name = ?',
      [file]
    );

    if (rows.length > 0) {
      console.log(`⏭️ Skipped: ${file}`);
      continue;
    }

    const filePath = path.join(seedDir, file);

    try {
      await runSQLFile(filePath);

      // insert record
      await db.execute(
        'INSERT INTO seeders (name) VALUES (?)',
        [file]
      );

      console.log(`✅ Seeded: ${file}`);
    } catch (err) {
      console.error(`❌ Failed: ${file}`);
      console.error(err.message);
      process.exit(1);
    }
  }

  console.log('All seeders done ✅');
};

export const seedFresh = async () => {
  await db.execute('DELETE FROM seeders');
  await seed();
};

// CLI run
if (process.argv.includes('--run')) {
  seed();
}
// src/database/migrate.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import  db  from '#config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsDir = path.join(__dirname, 'migrations');

// ✅ Ensure migrations table exists
const ensureMigrationsTable = async () => {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) UNIQUE,
      run_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

// 🔥 DROP ALL TABLES (safe)
const dropAllTables = async () => {
  const [tables] = await db.execute(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = DATABASE()
  `);

  await db.execute('SET FOREIGN_KEY_CHECKS = 0');

  for (let row of tables) {
    const table = row.TABLE_NAME || row.table_name;

    if (table !== 'migrations') {
      await db.execute(`DROP TABLE \`${table}\``);
      console.log(`Dropped: ${table}`);
    }
  }

  await db.execute('SET FOREIGN_KEY_CHECKS = 1');
};

// 🔥 RUN SQL FILE (with transaction)
const runMigrationFile = async (filePath) => {
  const sql = fs.readFileSync(filePath, 'utf-8');
  const queries = sql
    .split(';')
    .map(q => q.trim())
    .filter(q => q.length);

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    for (let query of queries) {
      await connection.query(query);
    }

    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

// 🔥 NORMAL MIGRATE (with tracking)
export const migrate = async () => {
  await ensureMigrationsTable();

  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.up.sql'))
    .sort();

  for (let file of files) {
    const [rows] = await db.execute(
      'SELECT * FROM migrations WHERE name = ?',
      [file]
    );

    if (rows.length > 0) {
      console.log(`Skipped: ${file}`);
      continue;
    }

    const filePath = path.join(migrationsDir, file);

    try {
      await runMigrationFile(filePath);

      await db.execute(
        'INSERT INTO migrations (name) VALUES (?)',
        [file]
      );

      console.log(`Migrated: ${file}`);
    } catch (err) {
      console.error(`Failed: ${file}`);
      console.error(err.message);
      process.exit(1);
    }
  }

  console.log('All migrations done ✅');
};

// 🔥 FRESH MIGRATE
export const migrateFresh = async () => {
  console.log('Dropping all tables...');

  await ensureMigrationsTable();
  await dropAllTables();

  await db.execute('DELETE FROM migrations');

  console.log('Running fresh migrations...');

  await migrate();

  console.log('Fresh migration completed ✅');
};
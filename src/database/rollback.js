import fs from 'fs';
import path from 'path';
import db from '#config/db.js';

const migrationsDir = path.join(process.cwd(), 'src/database/migrations');

export const rollback = async () => {
  // last executed migration
  const [rows] = await db.execute(
    'SELECT * FROM migrations ORDER BY id DESC LIMIT 1'
  );

  if (rows.length === 0) {
    console.log('⚠️ No migrations to rollback');
    return;
  }

  const lastMigration = rows[0].name;

  // convert up → down
  const downFile = lastMigration.replace('.up.sql', '.down.sql');
  const filePath = path.join(migrationsDir, downFile);

  if (!fs.existsSync(filePath)) {
    console.log(`❌ Down file not found: ${downFile}`);
    return;
  }

  const sql = fs.readFileSync(filePath, 'utf-8');

  const queries = sql.split(';').map(q => q.trim()).filter(Boolean);

  try {
    for (let q of queries) {
      await db.execute(q);
    }

    // remove from migrations table
    await db.execute(
      'DELETE FROM migrations WHERE name = ?',
      [lastMigration]
    );

    console.log(`✅ Rolled back: ${lastMigration}`);
  } catch (err) {
    console.error('❌ Rollback failed');
    console.error(err.message);
  }
};
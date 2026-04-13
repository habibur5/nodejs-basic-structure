import fs from 'fs';
import path from 'path';

const migrationsDir = path.join(process.cwd(), 'src/database/migrations');

const getNextNumber = () => {
  const files = fs.readdirSync(migrationsDir);

  const numbers = files
    .map(f => parseInt(f.split('_')[0]))
    .filter(n => !isNaN(n));

  const max = numbers.length ? Math.max(...numbers) : 0;

  return String(max + 1).padStart(3, '0');
};

// 🔥 Smart SQL generator
const generateSQL = (name) => {
  // create_users
  if (name.startsWith('create_')) {
    const table = name.replace('create_', '');

    return {
      up: `CREATE TABLE ${table} (
  id INT AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
      down: `DROP TABLE ${table};`
    };
  }

  // add_email_to_users
  if (name.startsWith('add_') && name.includes('_to_')) {
    const parts = name.split('_to_');
    const column = parts[0].replace('add_', '');
    const table = parts[1];

    return {
      up: `ALTER TABLE ${table} ADD ${column} VARCHAR(255);`,
      down: `ALTER TABLE ${table} DROP COLUMN ${column};`
    };
  }

  // remove_email_from_users
  if (name.startsWith('remove_') && name.includes('_from_')) {
    const parts = name.split('_from_');
    const column = parts[0].replace('remove_', '');
    const table = parts[1];

    return {
      up: `ALTER TABLE ${table} DROP COLUMN ${column};`,
      down: `ALTER TABLE ${table} ADD ${column} VARCHAR(255);`
    };
  }

  // drop_users
  if (name.startsWith('drop_')) {
    const table = name.replace('drop_', '');

    return {
      up: `DROP TABLE ${table};`,
      down: `-- Cannot safely recreate table automatically`
    };
  }

  // default fallback
  return {
    up: '-- Write your SQL here',
    down: '-- rollback SQL here'
  };
};

export const makeMigration = (name) => {
  if (!name) {
    console.log('❌ Migration name required');
    return;
  }

  const number = getNextNumber();
  const baseName = `${number}_${name}`;

  const upFile = path.join(migrationsDir, `${baseName}.up.sql`);
  const downFile = path.join(migrationsDir, `${baseName}.down.sql`);

  const { up, down } = generateSQL(name);

  fs.writeFileSync(upFile, `-- UP\n${up}\n`);
  fs.writeFileSync(downFile, `-- DOWN\n${down}\n`);

  console.log(`✅ Created:
${baseName}.up.sql
${baseName}.down.sql`);
};
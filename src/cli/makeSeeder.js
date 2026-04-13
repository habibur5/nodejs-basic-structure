import fs from 'fs';
import path from 'path';

const seedersDir = path.join(process.cwd(), 'src/database/seeders');

// get next number (001, 002...)
const getNextNumber = () => {
  const files = fs.readdirSync(seedersDir);

  const numbers = files
    .map(f => parseInt(f.split('_')[0]))
    .filter(n => !isNaN(n));

  const max = numbers.length ? Math.max(...numbers) : 0;

  return String(max + 1).padStart(3, '0');
};

export const makeSeeder = (name) => {
  if (!name) {
    console.log('❌ Seeder name required');
    return;
  }

  const number = getNextNumber();
  const fileName = `${number}_${name}.sql`;

  const filePath = path.join(seedersDir, fileName);

  const template = `-- Seeder: ${name}

INSERT INTO ${name} (/* columns */)
VALUES
  ();
`;

  fs.writeFileSync(filePath, template);

  console.log(`✅ Seeder created: ${fileName}`);
};
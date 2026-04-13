#!/usr/bin/env node

import { migrate, migrateFresh } from '../database/migrate.js';
import { seed, seedFresh } from '../database/seed.js';
import { rollback } from '../database/rollback.js';
import { makeMigration } from './makeMigration.js';
import { makeSeeder } from './makeSeeder.js';
import { makeModel } from './makeModel.js';

const command = process.argv[2];
const arg = process.argv[3];

switch (command) {
  case 'migrate':
    await migrate();
    break;

  case 'migrate:fresh':
    await migrateFresh();
    break;

  case 'make:model':
    makeModel(arg);
    break;
    
  case 'rollback':
    await rollback();
    break;

  case 'seed':
    await seed();
    break;

  case 'seed:fresh':
    await seedFresh();
    break;

  case 'make:migration':
    makeMigration(arg);
    break;

  case 'make:seeder':
    makeSeeder(arg);
    break;

  default:
    console.log(`
Available commands:

npm run migrate
npm run migrate:fresh
npm run rollback
npm run seed
npm run seed:fresh
npm run cli make:migration users
npm run cli make:seeder users
`);
}
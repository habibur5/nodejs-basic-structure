import fs from 'fs';
import path from 'path';

const basePath = path.join(process.cwd(), 'src');

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const makeModel = (name) => {
  if (!name) {
    console.log('❌ Model name required');
    return;
  }

  const modelName = capitalize(name);

  // paths
  const modelPath = path.join(basePath, 'models', `${name}.model.js`);
  const repoPath = path.join(basePath, 'repositories', `${name}.repository.js`);
  const servicePath = path.join(basePath, 'services', `${name}.service.js`);

  // prevent overwrite
  if (fs.existsSync(modelPath)) {
    console.log('❌ Model already exists');
    return;
  }

  // 📄 MODEL
  const modelTemplate = `import { db } from '#/config/db.js';

export const ${modelName}Model = {
  async findAll() {
    const [rows] = await db.execute('SELECT * FROM ${name}s');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM ${name}s WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const { name } = data;

    const [result] = await db.execute(
      'INSERT INTO ${name}s (name) VALUES (?)',
      [name]
    );

    return result.insertId;
  }
};
`;

  // 📄 REPOSITORY
  const repoTemplate = `import { ${modelName}Model } from '#/models/${name}.model.js';

export const ${modelName}Repository = {
  getAll: () => ${modelName}Model.findAll(),

  getById: (id) => ${modelName}Model.findById(id),

  create: (data) => ${modelName}Model.create(data)
};
`;

  // 📄 SERVICE
  const serviceTemplate = `import { ${modelName}Repository } from '#/repositories/${name}.repository.js';

export const ${modelName}Service = {
  async getAll() {
    return await ${modelName}Repository.getAll();
  },

  async getById(id) {
    if (!id) throw new Error('ID required');
    return await ${modelName}Repository.getById(id);
  },

  async create(data) {
    if (!data.name) throw new Error('Name required');
    return await ${modelName}Repository.create(data);
  }
};
`;

  // write files
  fs.writeFileSync(modelPath, modelTemplate);
  fs.writeFileSync(repoPath, repoTemplate);
  fs.writeFileSync(servicePath, serviceTemplate);

  console.log(`✅ Created:
- models/${name}.model.js
- repositories/${name}.repository.js
- services/${name}.service.js`);
};
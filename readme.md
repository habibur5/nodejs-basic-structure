# 🚀 Custom Node.js Migration & CLI System (MySQL)

A lightweight, production-ready database migration and CLI tool built with Node.js, Express, and MySQL using **raw SQL (no ORM)**.

---

# 📦 Features

* ✅ Raw SQL-based migrations
* ✅ Automatic migration tracking
* ✅ Rollback support (UP/DOWN)
* ✅ Seeder system with tracking
* ✅ Smart migration generator (auto SQL + rollback)
* ✅ CLI tool (Laravel Artisan style)
* ✅ Modular architecture (Model → Repository → Service)
* ✅ Alias-based imports (`#config`, `#services`, etc.)

---

# 📁 Project Structure

```
src/
 ├── config/
 │    └── db.js
 │
 ├── database/
 │    ├── migrations/
 │    │    ├── 001_create_users.up.sql
 │    │    ├── 001_create_users.down.sql
 │    │
 │    ├── seeders/
 │    │    ├── 001_users.sql
 │    │
 │    ├── migrate.js
 │    ├── rollback.js
 │    ├── seed.js
 │
 ├── cli/
 │    ├── index.js
 │    ├── makeMigration.js
 │    ├── makeSeeder.js
 │    ├── makeModel.js
 │
 ├── models/
 ├── repositories/
 ├── services/
```

---

# ⚙️ Installation

```bash
npm install
```

---

# 🔧 Configuration

## package.json (Alias Setup)

```json
"imports": {
  "#config/*": "./src/config/*",
  "#models/*": "./src/models/*",
  "#repositories/*": "./src/repositories/*",
  "#services/*": "./src/services/*"
}
```

---

## jsconfig.json (VS Code Support)

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "#config/*": ["src/config/*"],
      "#models/*": ["src/models/*"],
      "#repositories/*": ["src/repositories/*"],
      "#services/*": ["src/services/*"]
    }
  }
}
```

---

# 🛠️ CLI Commands

## 🔹 Migration

```bash
npm run migrate
```

Run all pending migrations

---

```bash
npm run migrate:fresh
```

Drop all tables and re-run migrations

---

```bash
npm run rollback
```

Rollback last migration

---

## 🔹 Seeder

```bash
npm run seed
```

Run all seeders (with tracking)

---

## 🔹 Generate Migration

```bash
npm run cli make:migration create_users
```

```bash
npm run cli make:migration add_email_string_to_users
```

```bash
npm run cli make:migration add_email_string_and_age_int_to_users
```

---

## 🔹 Generate Seeder

```bash
npm run cli make:seeder users
```

---

## 🔹 Generate Model Layer

```bash
npm run cli make:model user
```

Creates:

* Model
* Repository
* Service

---

# 🧠 Migration System

## 🔹 UP Migration

Defines what to apply:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY
);
```

---

## 🔹 DOWN Migration

Defines rollback:

```sql
DROP TABLE users;
```

---

## 🔁 Rule

```
DOWN = exact reverse of UP
```

---

# 🧠 Smart Migration Naming

| Command                   | Result       |
| ------------------------- | ------------ |
| create_users              | CREATE TABLE |
| add_email_string_to_users | ADD COLUMN   |
| remove_email_from_users   | DROP COLUMN  |

---

# 🌱 Seeder System

* Automatically tracks executed seeders
* Prevents duplicate insertion
* Uses `seeders` table

---

# 🧠 Architecture

```
Controller → Service → Repository → Model → Database
```

---

# ⚠️ Best Practices

* Never edit old migrations ❌
* Always write proper DOWN SQL ✅
* Use migrations for structure only
* Use seeders for initial data only
* Avoid `migrate:fresh` in production

---

# 🔥 Example Usage

```bash
npm run cli make:migration create_users
npm run migrate
npm run cli make:seeder users
npm run seed
```

---

# 🚀 Future Improvements

* make:controller
* make:route
* full CRUD generator
* foreign key auto generator
* schema validation

---

# 💡 Author

Built as a custom backend framework system using Node.js without ORM.

---

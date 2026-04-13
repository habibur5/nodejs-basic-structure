# 📁 3. `#repositories/` → Database queries (IMPORTANT)

👉 এখানে শুধু DB related কাজ হবে

### ✔️ কী থাকবে?

* SELECT, INSERT, UPDATE, DELETE

### ✅ Example:

```js
// src/repositories/userRepository.js
import { db } from '#config/db';

export const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
};

export const createUser = async (name, email, password) => {
  const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password]
  );
  return result.insertId;
};
```

---


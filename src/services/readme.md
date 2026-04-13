# 📁 4. `#services/` → Business Logic (Brain of app)

👉 এখানে logic থাকবে (validation, decision, processing)

### ✔️ কী থাকবে?

* password hash
* business rules
* calculations

### ✅ Example:

```js
// src/services/userService.js
import bcrypt from 'bcrypt';
import { findUserByEmail, createUser } from '#repositories/userRepository';

export const registerUser = async (name, email, password) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await createUser(name, email, hashedPassword);

  return { id: userId, name, email };
};
```

---


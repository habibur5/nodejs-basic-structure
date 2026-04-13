# 📁 9. `#utils/` → Helper functions

👉 reusable functions

### ✔️ কী থাকবে?

* token generate
* date format
* common helpers

### ✅ Example:

```js
// src/utils/generateToken.js
import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};
```

---


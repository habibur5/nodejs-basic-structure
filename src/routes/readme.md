# 📁 6. `#routes/` → API routes

👉 URL mapping

### ✔️ কী থাকবে?

* endpoints define

### ✅ Example:

```js
// src/routes/userRoutes.js
import express from 'express';
import { register } from '#controllers/userController';

const router = express.Router();

router.post('/register', register);

export default router;
```

---


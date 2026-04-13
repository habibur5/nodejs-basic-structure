# 📁 5. `#controllers/` → Handle request & response

👉 API entry point

### ✔️ কী থাকবে?

* req.body / req.params handle
* response send

### ✅ Example:

```js
// src/controllers/userController.js
import { registerUser } from '#services/userService';

export const register = async (req, res) => {
  try {
    const user = await registerUser(
      req.body.name,
      req.body.email,
      req.body.password
    );

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
```

---


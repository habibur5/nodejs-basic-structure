# 📁 7. `#middlewares/` → Request interceptors

👉 request আসার আগে/পরে কাজ করে

### ✔️ কী থাকবে?

* auth middleware
* error handler

### ✅ Example:

```js
// src/middlewares/authMiddleware.js
export const isAuthenticated = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};
```

---


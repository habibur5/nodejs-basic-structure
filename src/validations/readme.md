# 📁 8. `#validations/` → Input validation

👉 user input check

### ✔️ কী থাকবে?

* Joi / custom validation

### ✅ Example:

```js
// src/validators/userValidation.js
import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
```

---


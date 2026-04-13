# 📁 2. `#models/` → Data structure (optional in raw MySQL)

👉 ORM না হলে খুব বেশি দরকার নেই, but structure রাখতে পারো

### ORM মানে কী?

* ORM = Object Relational Mapping

```js
👉 এটা এমন একটা system/library যা দিয়ে তুমি database এর সাথে object (JavaScript class/object) দিয়ে কাজ করতে পারো —
SQL না লিখেও অনেক কাজ করা যায়।

```

### ✔️ কী থাকবে?

* Data shape
* class / schema

### ✅ Example:

```js
// src/models/User.js
export class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
```

---


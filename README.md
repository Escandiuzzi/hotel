# Hotel Project

A backend project using **TypeScript**, **Express**, **Prisma**, and **SQLite**. Includes a repository pattern for Employees and Jest for testing.

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/hotel.git
cd hotel
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file (already included in `.gitignore`):

```env
DATABASE_URL="file:./prisma/dev.db"
```

### 4. Generate Prisma client

```bash
npx prisma generate
```

### 5. Run migrations (create database & tables)

```bash
npx prisma migrate dev --name init_employees
```

---

## 💻 Running the project

### Development mode

```bash
npm run dev
```

This uses **ts-node + nodemon** and restarts automatically on changes.

### Build & run

```bash
npm run build
npm start
```

---

## 🧪 Testing

### Run tests with Jest

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

---

## 🔑 Example API Requests

### Create Employee

**POST** `/employees`

```json
{
  "name": "Alice Smith",
  "login": "alicesmith",
  "password": "SecurePass!2025"
}
```

### Get All Employees

**GET** `/employees`

Response:

```json
[
  {
    "name": "Alice Smith",
    "login": "alicesmith"
  },
  {
    "name": "John Doe",
    "login": "johndoe"
  }
]
```

---

## 📦 Tech Stack

* Node.js + TypeScript
* Express.js
* Prisma ORM
* SQLite
* Jest for testing
* GitHub Actions for CI

---

## ⚡ Notes

* Passwords are hashed with MD5 before saving. For production, consider using **bcrypt** or **argon2**.
* Prisma client must be regenerated if you update `schema.prisma`.

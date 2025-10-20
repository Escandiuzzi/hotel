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

**POST** `/employees`

```json
{
  "name": "Ana Costa",
  "login": "anacosta",
  "password": "SenhaSegura@2025"
}
```

---

**POST** `/employees/login`

```json
{
  "login": "anacosta",
  "password": "SenhaSegura@2025"
}
```

```json
{
  "name": "Ana Costa",
  "login": "anacosta"
}
```

---

**POST** `/guests`

```json
{
  "name": "Lucas Santos",
  "age": 34,
  "phone": "(11) 98888-7777",
  "email": "lucas.almeida@email.com",
  "document": "123.456.789-00"
}
```

```json
{
  "id": "hospede-abc123"
}
```

---

**GET** `/guests`

```json
[
  {
    "id": "hospede-123",
    "name": "Lucas Santos",
    "age": 34,
    "phone": "(11) 98888-7777",
    "email": "lucas.almeida@email.com",
    "document": "123.456.789-00"
  }
]
```

---

**POST** `/bookings`

```json
{
  "guestId": "hospede-123",
  "room": "204",
  "reservationDate": "2025-11-20T10:00:00Z",
  "entryDate": "2025-11-25T14:00:00Z",
  "departureDate": "2025-11-30T12:00:00Z",
  "status": "CONFIRMADA",
  "serviceIds": ["servico-1", "servico-3"]
}
```

```json
{
  "id": "reserva-xyz789"
}
```

---

**PUT** `/bookings/:id`

```json
{
  "status": "CHECK-IN REALIZADO",
  "serviceIds": ["servico-2"]
}
```

```json
{
  "id": "reserva-xyz789",
  "guestName": "Lucas Santos",
  "room": "204",
  "status": "CHECK-IN REALIZADO",
  "services": [
    { "serviceId": "servico-2", "serviceName": "Café da Manhã", "price": 35.0 }
  ]
}
```

---

**GET** `/bookings`

```json
[
  {
    "id": "reserva-xyz789",
    "guestName": "Lucas Santos",
    "room": "204",
    "entryDate": "2025-11-25T14:00:00Z",
    "departureDate": "2025-11-30T12:00:00Z",
    "status": "CONFIRMADA"
  }
]
```

---

## 📦 Tech Stack

- Node.js + TypeScript
- Express.js
- Prisma ORM
- SQLite
- Jest for testing
- GitHub Actions for CI

---

## ⚡ Notes

- Passwords are hashed with MD5 before saving. For production, consider using **bcrypt** or **argon2**.
- Prisma client must be regenerated if you update `schema.prisma`.

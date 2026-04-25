# Task Manager API – Backend

A clean, layered REST API for task management built with **Express + TypeScript**.  
Designed with **repository pattern** – currently using in‑memory storage, ready to switch to PostgreSQL with minimal changes.

---

## 🚀 Features

- ✅ Full CRUD operations for tasks  
- ✅ Layered architecture: Route → Controller → Service → Repository → Store  
- ✅ In‑memory storage (no database required to start)  
- ✅ Ready for PostgreSQL – just swap the repository layer  
- ✅ Central error handling  
- ✅ UUIDs for IDs (future‑proof)  
- ✅ Path aliases (`@/`) for clean imports  

---

## 📦 Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Runtime     | Node.js (v18+)                      |
| Language    | TypeScript (strict mode)            |
| Framework   | Express                             |
| Validation  | service layer only                  |

---

## 📁 Project Structure

```
src/
├── controllers/   # HTTP request handling
├── interfaces/    # TypeScript types & DTOs
├── middlewares/   # Error handler
├── models/        # Domain models (Postgres‑oriented)
├── repositories/  # Data access layer (in‑memory)
├── routes/        # API route definitions
├── services/      # Business logic
├── store/         # In‑memory data store (temporary)
├── utils/         # AppError class
├── app.ts         # Express app setup
└── server.ts      # Entry point
```

---

## 🛠️ Getting Started

### 1. Clone & Install

```bash
git clone <repo-url>
cd task-api-backend
npm install
```

### 2. Environment (optional)

Create a `.env` file if you need to change the port:

```env
PORT=3000
```

Default port is `3000`.

### 3. Run in Development (hot reload)

```bash
npm run dev
```

Server starts at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm start
```

---

## 📡 API Endpoints

**Base URL:** `http://localhost:3000/api`

| Method   | Endpoint     | Description                          |
|----------|--------------|--------------------------------------|
| `GET`    | `/tasks`     | Get all tasks                        |
| `GET`    | `/tasks/:id` | Get a single task                    |
| `POST`   | `/tasks`     | Create a new task                    |
| `PATCH`  | `/tasks/:id` | Update a task (partial)              |
| `DELETE` | `/tasks/:id` | Delete a task                        |



## 📨 Request / Response Examples

### `POST /tasks` – Create

**Request body:**
```json
{
  "title": "Learn repository pattern"
}
```

**Response (201 Created):**
```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "title": "Learn repository pattern",
  "completed": false,
  "createdAt": "2026-04-25T10:00:00.000Z",
  "updatedAt": "2026-04-25T10:00:00.000Z"
}
```

### `PATCH /tasks/:id` – Update

**Request body** (at least one field):
```json
{
  "completed": true
}
```

**Response (200 OK):** updated task object.

### `DELETE /tasks/:id` – Delete

**Response:** `204 No Content`

### `GET /tasks?status=completed` – Filter

**Response (200 OK):** array of completed tasks only.

---

## 🧪 Testing with cURL

```bash
# Create a task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy milk"}'

# Get all tasks
curl http://localhost:3000/api/tasks

# Update a task (replace :id with real UUID)
curl -X PATCH http://localhost:3000/api/tasks/:id \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a task
curl -X DELETE http://localhost:3000/api/tasks/:id
```

---


## 🔄 Switching to PostgreSQL (Future)

1. Install `pg` or your preferred ORM.
2. Create `PostgresTaskRepository` implementing `ITaskRepository`.
3. In `src/app.ts`, change one line:

```ts
// const taskRepository = new InMemoryTaskRepository();
const taskRepository = new PostgresTaskRepository();
```

4. Update the connection logic in a loader (optional).

Done – the rest of the code remains unchanged.

---

## 📜 Available Scripts

| Command           | Description                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Start dev server with hot reload     |
| `npm run build`   | Compile TypeScript to `dist/`        |
| `npm start`       | Run compiled production build        |

---


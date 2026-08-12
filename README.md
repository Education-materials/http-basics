# Simple CRUD — Educational Project

A very small CRUD application built to understand how a frontend, backend API, and database communicate.

## Stack

* **Frontend:** HTML, CSS, JavaScript
* **Frontend server:** Python `http.server`
* **Backend:** Node.js + Express
* **Database:** SQLite
* **Database driver:** `better-sqlite3`

No React, ORM, or other frontend frameworks are used.

## Project Structure

```text
simple-crud/
├── frontend/
│   └── index.html
│
├── backend/
│   └── server.js
│
├── db/
│   └── database.js
│
├── package.json
└── database.db
```

## Architecture

```text
Browser
   │
   │ HTTP
   ▼
Frontend
localhost:5173
   │
   │ fetch()
   ▼
Backend API
localhost:8000
   │
   │ SQL
   ▼
SQLite
```

The frontend is served separately from the backend so we can clearly see how a frontend communicates with an API.

## CRUD API

| Operation | Method   | Endpoint         |
| --------- | -------- | ---------------- |
| Create    | `POST`   | `/api/items`     |
| Read      | `GET`    | `/api/items`     |
| Update    | `PUT`    | `/api/items/:id` |
| Delete    | `DELETE` | `/api/items/:id` |

Example item:

```json
{
  "name": "Keyboard",
  "price": 80
}
```

## Setup

From the project root:

```bash
npm install
```

This installs the backend dependencies.

## Start the Backend

From the project root:

```bash
node backend/server.js
```

The API will run at:

```text
http://localhost:8000
```

## Start the Frontend

Open another terminal:

```bash
cd frontend
python3 -m http.server 5173
```

Then open:

```text
http://localhost:5173
```


```bash
# Read
curl http://localhost:8000/api/items

# Create
curl -X POST http://localhost:8000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Keyboard","price":80}'

# Update
curl -X PUT http://localhost:8000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Mechanical Keyboard","price":100}'

# Delete
curl -X DELETE http://localhost:8000/api/items/1


## What This Project Teaches

The main goal is understanding the basic request flow:

```text
User
 ↓
Browser
 ↓
HTTP request
 ↓
Express
 ↓
Route
 ↓
SQL query
 ↓
SQLite
 ↓
Database result
 ↓
Express
 ↓
JSON response
 ↓
Browser
```

It also demonstrates:

* HTTP methods
* API routes
* JSON requests and responses
* CORS
* Express middleware
* URL parameters
* SQL CRUD operations
* Database drivers
* Frontend `fetch()`
* Separation between frontend, backend, and database

## Why No ORM?

The project intentionally uses SQL directly:

```javascript
db.prepare("SELECT * FROM items").all();
```

This makes the relationship between the API and database easier to see.

Once the basic architecture is understood, an ORM can be introduced later.

## Why Two Servers?

The frontend and backend are intentionally served separately:

```text
localhost:5173  → frontend
localhost:8000  → backend
```

This helps demonstrate that the frontend is a **client** of the backend API.

The backend is a **client** of the database.

```text
Frontend
   ↓ HTTP
Backend
   ↓ SQL
Database
```

This is the core architecture used by much larger applications as well.

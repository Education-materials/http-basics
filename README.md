# Simple CRUD — Educational Project

A very small CRUD application built to understand how a frontend, backend API, and database communicate.

The project intentionally avoids frameworks on the frontend so the basic concepts are easy to see.

## Stack

- **Frontend:** HTML, CSS, JavaScript
- **Frontend server:** Python `http.server`
- **Backend:** Node.js + Express
- **Database:** SQLite
- **Database driver:** `better-sqlite3`

No React, ORM, or other frontend frameworks are used.

---

## Project Structure

```text
simple-crud/
├── frontend/
│   ├── index.html
│   ├── search.html
│   ├── style.css
│   └── app.js
│
├── backend/
│   └── server.js
│
├── db/
│   └── database.js
│
├── package.json
├── package-lock.json
└── database.db
```

`database.db` is created automatically when the backend starts.

---

# Architecture

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

The frontend and backend are intentionally served separately so we can clearly see how a frontend communicates with an API.

The backend then communicates with the database.

```text
Frontend
   │
   │ HTTP
   ▼
Backend
   │
   │ SQL
   ▼
Database
```

---

# API

## CRUD Endpoints

| Operation | HTTP Method | Endpoint |
|---|---|---|
| Create | `POST` | `/api/items` |
| Read | `GET` | `/api/items` |
| Update | `PUT` | `/api/items/:id` |
| Delete | `DELETE` | `/api/items/:id` |

## Search Endpoint

Lesson 2 adds a search endpoint:

```text
GET /api/items/search?name=keyboard
```

The `name` value is a **query parameter**.

For example:

```text
/api/items/search?name=keyboard
                    └── query parameter
```

---

# Example Item

```json
{
  "name": "Keyboard",
  "price": 80
}
```

---

# Setup

Make sure Node.js and Python are installed.

From the project root:

```bash
npm install
```

This installs the backend dependencies.

---

# Start the Backend

From the project root:

```bash
node backend/server.js
```

The backend API will run at:

```text
http://localhost:8000
```

You should see something similar to:

```text
Backend running at http://localhost:8000
```

---

# Start the Frontend

Open another terminal.

From the project root:

```bash
cd frontend
python3 -m http.server 5173
```

The frontend will be available at:

```text
http://localhost:5173
```

Open it in your browser.

---

# Using the Application

## CRUD Page

Open:

```text
http://localhost:5173/index.html
```

You can:

- Add an item
- View all items
- Edit an item
- Delete an item

The newest items are displayed first.

---

## Search Page

Open:

```text
http://localhost:5173/search.html
```

Enter an item name and click **Search**.

The frontend sends a request such as:

```text
GET /api/items/search?name=keyboard
```

The backend receives the query parameter and searches the database.

---

# Testing the API with curl

You can test the backend directly without using the frontend.

This is useful for understanding that the frontend is simply another HTTP client.

## Read

```bash
curl http://localhost:8000/api/items
```

## Create

```bash
curl -X POST http://localhost:8000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Keyboard","price":80}'
```

## Update

```bash
curl -X PUT http://localhost:8000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Mechanical Keyboard","price":100}'
```

## Delete

```bash
curl -X DELETE http://localhost:8000/api/items/1
```

## Search

```bash
curl "http://localhost:8000/api/items/search?name=keyboard"
```

---

# Fetch vs curl

The browser uses JavaScript `fetch()`:

```javascript
fetch("http://localhost:8000/api/items");
```

The terminal can use `curl`:

```bash
curl http://localhost:8000/api/items
```

Both are HTTP clients.

They can send requests to the same backend API.

```text
                 HTTP
                  │
        ┌─────────┴─────────┐
        │                   │
     fetch()              curl
        │                   │
     Browser             Terminal
        │                   │
        └─────────┬─────────┘
                  ▼
             Express API
```

The important concept is that **HTTP is the communication protocol**. `fetch()` and `curl` are different ways of making HTTP requests.

---

# What Is an HTTP Request?

An HTTP request contains several important parts:

```text
HTTP Request
│
├── Method
├── URL
├── Headers
└── Body
```

For example:

```http
POST /api/items HTTP/1.1
Content-Type: application/json

{
  "name": "Keyboard",
  "price": 80
}
```

---

# What Is an HTTP Response?

The server sends an HTTP response:

```text
HTTP Response
│
├── Status
├── Headers
└── Body
```

For example:

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 1,
  "name": "Keyboard",
  "price": 80
}
```

---

# HTTP Status Codes

This project uses several HTTP status codes:

```text
200 OK
201 Created
204 No Content
404 Not Found
```

HTTP status codes are grouped into categories:

```text
2xx → Success
4xx → Client error
5xx → Server error
```

---

# What This Project Teaches

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

The project demonstrates:

- HTTP
- HTTP requests and responses
- HTTP methods
- HTTP status codes
- HTTP headers
- API routes
- URL parameters
- Query parameters
- JSON requests and responses
- CORS
- Express middleware
- Frontend `fetch()`
- `curl`
- Browser Network DevTools
- SQL CRUD operations
- SQLite
- Database drivers
- Frontend/backend separation

---

# Why No ORM?

The project intentionally uses SQL directly:

```javascript
db.prepare("SELECT * FROM items").all();
```

This makes the relationship between the API and database easier to see.

Once the basic architecture is understood, an ORM can be introduced later.

---

# Why Two Servers?

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

This is the core architecture used by much larger applications.

---

# Lessons

## Lesson 1 — Basic CRUD

Learn how a frontend communicates with a backend API and how the backend communicates with a database.

Topics:

- Frontend and backend separation
- HTTP basics
- Express
- API endpoints
- CRUD
- SQLite
- SQL
- Database drivers
- `fetch()`

---

## Lesson 2 — HTTP Requests & Responses

Learn more about what actually travels between the frontend and backend.

Topics:

- HTTP methods
- Request URL
- Request headers
- Request body
- Response status
- Response headers
- Response body
- Query parameters
- URL parameters
- CORS
- `fetch()` vs `curl`
- Browser Network DevTools

---

# Educational Goal

The goal of this project is not to build a production application.

The goal is to understand the fundamental building blocks underneath larger web applications:

```text
HTML
 ↓
JavaScript
 ↓
HTTP
 ↓
API
 ↓
Backend
 ↓
SQL
 ↓
Database
```

Once these fundamentals are understood, larger technologies such as React, Django, FastAPI, PostgreSQL, ORMs, authentication systems, Docker, and cloud services become easier to understand.
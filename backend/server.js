const express = require("express");
const cors = require("cors");
const db = require("../db/database");

const app = express();
const PORT = 8000;

// Allow our separate frontend to call this API.
app.use(cors({
    origin: "http://localhost:5173"
}));

// Parse JSON request bodies.
app.use(express.json());


// GET /api/items
// Read all items.
app.get("/api/items", (req, res) => {

    const items = db
        .prepare("SELECT * FROM items ORDER BY id")
        .all();

    res.json(items);
});


// POST /api/items
// Create an item.
app.post("/api/items", (req, res) => {

    const { name, price } = req.body;

    const result = db
        .prepare(`
            INSERT INTO items (name, price)
            VALUES (?, ?)
        `)
        .run(name, price);

    const item = db
        .prepare("SELECT * FROM items WHERE id = ?")
        .get(result.lastInsertRowid);

    res.status(201).json(item);
});


// PUT /api/items/:id
// Update an item.
app.put("/api/items/:id", (req, res) => {

    const { name, price } = req.body;
    const { id } = req.params;

    const result = db
        .prepare(`
            UPDATE items
            SET name = ?, price = ?
            WHERE id = ?
        `)
        .run(name, price, id);

    if (result.changes === 0) {
        return res.status(404).json({
            error: "Item not found"
        });
    }

    const item = db
        .prepare("SELECT * FROM items WHERE id = ?")
        .get(id);

    res.json(item);
});


// DELETE /api/items/:id
// Delete an item.
app.delete("/api/items/:id", (req, res) => {

    const { id } = req.params;

    const result = db
        .prepare("DELETE FROM items WHERE id = ?")
        .run(id);

    if (result.changes === 0) {
        return res.status(404).json({
            error: "Item not found"
        });
    }

    res.status(204).end();
});


// Unknown route.
app.use((req, res) => {
    res.status(404).json({
        error: "Not found"
    });
});


app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
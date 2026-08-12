const Database = require("better-sqlite3");

// Open the SQLite database.
// If the file doesn't exist, SQLite creates it.
const db = new Database("database.db");

// Create the table when the application starts.
db.exec(`
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL
    )
`);

module.exports = db;
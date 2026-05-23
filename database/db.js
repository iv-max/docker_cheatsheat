const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/cheatsheet.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS sections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS commands (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section_id INTEGER NOT NULL,
      command TEXT NOT NULL,
      description TEXT,
      FOREIGN KEY (section_id) REFERENCES sections(id)
    )
  `);
});

module.exports = db;

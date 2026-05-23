const db = require("../database/db");

function createSection(req, res) {
  const { title, description } = req.body;

  db.run(
    `
    INSERT INTO sections (title, description)
    VALUES (?, ?)
    `,
    [title, description],
    (err) => {
      if (err) {
        console.error(err.message);
        return res.send("Database error");
      }

      res.redirect("/");
    },
  );
}

function deleteSection(req, res) {
  const { section_id } = req.body;

  db.run(
    `
    DELETE FROM sections
    WHERE id = ?
    `,
    [section_id],
    (err) => {
      if (err) {
        console.error(err.message);
        return res.send("Database error");
      }

      res.redirect("/");
    },
  );
}

module.exports = {
  createSection,
  deleteSection,
};

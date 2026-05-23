const db = require("../database/db");

function createCommand(req, res) {
  const { section_id, command, description } = req.body;

  db.run(
    `
    INSERT INTO commands
    (
      section_id,
      command,
      description
    )
    VALUES (?, ?, ?)
    `,
    [section_id, command, description],
    (err) => {
      if (err) {
        console.error(err.message);
        return res.send("Database error");
      }

      res.redirect("/");
    },
  );
}

function deleteCommand(req, res) {
  const { command_id } = req.body;

  db.run(
    `
    DELETE FROM commands
    WHERE id = ?
    `,
    [command_id],
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
  createCommand,
  deleteCommand,
};

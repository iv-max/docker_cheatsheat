const db = require("../database/db");

function seedDatabase(req, res) {
  db.run(
    `
    INSERT INTO sections (title, description)
    VALUES (?, ?)
    `,
    ["Images", "Docker image management commands"],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.send("Error creating section");
      }

      const sectionId = this.lastID;

      db.run(
        `
        INSERT INTO commands (section_id, command, description)
        VALUES (?, ?, ?)
        `,
        [sectionId, "docker images", "List all local Docker images"],
        (err) => {
          if (err) {
            console.error(err.message);
            return res.send("Error creating command");
          }

          res.send("Seed data added successfully");
        },
      );
    },
  );
}

module.exports = {
  seedDatabase,
};

const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const db = require("./database/db");

const PORT = 3000;

const fs = require("fs");

app.get("/", (req, res) => {
  db.all(
    `
    SELECT
      sections.id AS section_id,
      sections.title AS section_title,
      sections.description AS section_description,
      commands.id AS command_id,
      commands.command,
      commands.description AS command_description
    FROM sections
    LEFT JOIN commands
      ON sections.id = commands.section_id
    ORDER BY sections.id
    `,
    [],
    (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.send("Database error");
      }

      const sectionsMap = {};

      rows.forEach((row) => {
        if (!sectionsMap[row.section_id]) {
          sectionsMap[row.section_id] = {
            id: row.section_id,
            title: row.section_title,
            description: row.section_description,
            commands: [],
          };
        }

        if (row.command) {
          sectionsMap[row.section_id].commands.push({
            id: row.command_id,
            command: row.command,
            description: row.command_description,
          });
        }
      });

      let sectionsHTML = "";

      Object.values(sectionsMap).forEach((section) => {
        sectionsHTML += `
          <section class="section">

<div class="section-header">

  <h2>${section.title}</h2>

  ${
    section.commands.length === 0
      ? `
        <form
          action="/delete-section"
          method="POST"
          class="delete-form"
        >

          <input
            type="hidden"
            name="section_id"
            value="${section.id}"
          >

          <button
            type="submit"
            class="delete-button"
            onclick="return confirm('Delete section?')"
          >
            ✕
          </button>

        </form>
      `
      : ""
  }

</div>
            <p class="section-description">
              ${section.description}
            </p>
        `;

        section.commands.forEach((cmd) => {
          sectionsHTML += `
            <div class="command-card">
  
  <form
    action="/delete-command"
    method="POST"
    class="delete-form"
  >

    <input
      type="hidden"
      name="command_id"
      value="${cmd.id}"
    >

    <button
      type="submit"
      class="delete-button"
      onclick="return confirm('Delete command?')"
    >
      ✕
    </button>

  </form>
            
  <code>${cmd.command}</code>

  <p class="command-description">
    ${cmd.description}
  </p>

            </div>
          `;
        });

        sectionsHTML += `

  <div
    class="add-command-area"
    data-section-id="${section.id}"
  >
    + Add Command
  </div>

`;

        sectionsHTML += `
          </section>
        `;
      });

      let html = fs.readFileSync("./views/index.html", "utf8");

      html = html.replace("{{SECTIONS}}", sectionsHTML);

      res.send(html);
    },
  );
});

app.post("/sections", (req, res) => {
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
});

app.get("/seed", (req, res) => {
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
});



app.post("/commands", (req, res) => {
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
});


app.post("/delete-command", (req, res) => {
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
});

app.post("/delete-section", (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

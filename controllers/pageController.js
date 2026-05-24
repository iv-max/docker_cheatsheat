const db = require("../database/db");
const loadView = require("../utils/loadView");

function escapeHtml(text = "") {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getHomePage(req, res) {
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
    ORDER BY sections.id, commands.id ASC
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
<h2>${escapeHtml(section.title)}</h2>
                <div class="section-actions">
                  <button
                    type="button"
                    class="edit-button"
                    data-edit-type="section"
                    data-section-id="${section.id}"
data-section-title="${escapeHtml(section.title)}"
data-section-description="${escapeHtml(section.description)}"
                  >
                    Edit
                  </button>


              ${
                section.commands.length === 0
                  ? `
                    <form action="/delete-section" method="POST" class="delete-form">
                      <input type="hidden" name="section_id" value="${section.id}">

                      <button
                        type="submit"
                        class="delete-button"
                        data-delete-type="section"
                      >
                        ✕
                      </button>
                    </form>
                  `
                  : ""
              }
            </div>

            </div>

            <p class="section-description">
              ${escapeHtml(section.description)}
            </p>
        `;

        section.commands.forEach((cmd) => {
          sectionsHTML += `
            <div class="command-card">

                          <button
                type="button"
                class="edit-button"
                data-edit-type="command"
                data-command-id="${cmd.id}"
data-command-text="${escapeHtml(cmd.command)}"
data-command-description="${escapeHtml(cmd.description)}"
              >
                Edit
              </button>

              <form action="/delete-command" method="POST" class="delete-form">
                <input type="hidden" name="command_id" value="${cmd.id}">

                <button
                  type="submit"
                  class="delete-button"
                  data-delete-type="command"
                >
                  ✕
                </button>
              </form>

              <code>${escapeHtml(cmd.command)}</code>

              <p class="command-description">
                ${escapeHtml(cmd.description)}
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
          </section>
        `;
      });

      let html = loadView("./views/index.html");

      html = html.replace("{{SECTIONS}}", sectionsHTML);
      html = html.replace(
        "{{ADD_SECTION_MODAL}}",
        loadView("./views/partials/add-section-modal.html"),
      );
      html = html.replace(
        "{{ADD_COMMAND_MODAL}}",
        loadView("./views/partials/add-command-modal.html"),
      );
      html = html.replace(
        "{{CONFIRM_DELETE_MODAL}}",
        loadView("./views/partials/confirm-delete-modal.html"),
      );

      html = html.replace(
        "{{EDIT_MODAL}}",
        loadView("./views/partials/edit-modal.html"),
      );

      res.send(html);
    },
  );
}

module.exports = {
  getHomePage,
};

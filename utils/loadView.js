const fs = require("fs");

function loadView(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

module.exports = loadView;

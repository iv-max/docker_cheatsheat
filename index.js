const express = require("express");

const pageRoutes = require("./routes/pageRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const commandRoutes = require("./routes/commandRoutes");
const seedRoutes = require("./routes/seedRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", pageRoutes);
app.use("/", sectionRoutes);
app.use("/", commandRoutes);
app.use("/", seedRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});



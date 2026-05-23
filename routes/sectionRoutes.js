const express = require("express");

const router = express.Router();

const {
  createSection,
  deleteSection,
} = require("../controllers/sectionController");

router.post("/sections", createSection);
router.post("/delete-section", deleteSection);

module.exports = router;

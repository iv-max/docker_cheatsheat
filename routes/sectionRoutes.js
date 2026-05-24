const express = require("express");

const router = express.Router();

const {
  createSection,
  deleteSection,
  updateSection,
} = require("../controllers/sectionController");

router.post("/sections", createSection);
router.post("/delete-section", deleteSection);
router.post("/edit-section", updateSection);

module.exports = router;

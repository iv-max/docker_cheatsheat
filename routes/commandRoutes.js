const express = require("express");

const router = express.Router();

const {
  createCommand,
  deleteCommand,
  updateCommand,
} = require("../controllers/commandController");

router.post("/commands", createCommand);
router.post("/delete-command", deleteCommand);
router.post("/edit-command", updateCommand);

module.exports = router;

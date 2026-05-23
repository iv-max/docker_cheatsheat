const express = require("express");

const router = express.Router();

const {
  createCommand,
  deleteCommand,
} = require("../controllers/commandController");

router.post("/commands", createCommand);
router.post("/delete-command", deleteCommand);

module.exports = router;

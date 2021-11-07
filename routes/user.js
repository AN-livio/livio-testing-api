const express = require("express");
const {
  newUser,
  submitTest,
  submitResume,
} = require("../controllers/userController");
const router = express.Router();

router.post("/new", newUser);

router.post("/submit", submitTest);
router.post("/resume", submitResume);

module.exports = router;

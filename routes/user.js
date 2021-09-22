const express = require("express");
const { newUser, submitTest } = require("../controllers/userController");
const router = express.Router();

router.post("/new", newUser);

router.post("/submit", submitTest);

module.exports = router;

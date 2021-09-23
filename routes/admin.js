const express = require("express");
const {
  login,
  logout,
  addQuestion,
  deleteQuestion,
  getScorecard,
  getAllQuestions,
} = require("../controllers/adminContoller");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/login", login);
router.get("/scorecard", auth, getScorecard);
router.post("/logout", auth, logout);
router.post("/addquestion", auth, addQuestion);
router.post("/deletequestion", auth, deleteQuestion);
router.get("/getquestions", auth, getAllQuestions);

module.exports = router;

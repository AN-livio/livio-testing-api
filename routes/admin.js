const express = require("express");
const {
  login,
  logout,
  addQuestion,
  deleteQuestion,
  getScorecard,
  getAllQuestions,
  getcsv,
  getQuestion,
  modifyQuestion,
} = require("../controllers/adminContoller");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/login", login);
router.post("/logout", auth, logout);
router.post("/addquestion", auth, addQuestion);
router.post("/deletequestion", auth, deleteQuestion);
router.post("/modifyquestion", auth, modifyQuestion);
router.get("/getquestions", auth, getAllQuestions);
router.get("/getcsv", auth, getcsv);
router.get("/getq", auth, getQuestion);
router.get("/getallcandidates",auth,getCandidates)

module.exports = router;

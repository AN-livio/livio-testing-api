const User = require("../models/user");
const Question = require("../models/question");

module.exports.newUser = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User(req.body);
      await user.save();
    }

    let allQuestions = await Question.find({});
    let level1 = allQuestions.filter((el) => el.levelTag == "level1");
    level1.sort(() => Math.random() - 0.5);
    let level2 = allQuestions.filter((el) => el.levelTag == "level2");
    level2.sort(() => Math.random() - 0.5);
    let level3 = allQuestions.filter((el) => el.levelTag == "level3");
    level3.sort(() => Math.random() - 0.5);
    let level4 = allQuestions.filter((el) => el.levelTag == "level4");
    level4.sort(() => Math.random() - 0.5);
    let level5 = allQuestions.filter((el) => el.levelTag == "level5");
    level5.sort(() => Math.random() - 0.5);
    let test = [
      level1[0],
      level1[1],
      level2[0],
      level2[1],
      level3[0],
      level3[1],
      level4[0],
      level4[1],
      level5[0],
      level5[1],
    ];
    res.status(201).send({ user, test });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.submitTest = async (req, res) => {
  try {
    let { email, totalScore, individualScore } = req.body;
    let user = await User.findOne({ email });
    user.individualScore = individualScore;
    user.totalScore = totalScore;
    user.lastTestDate = new Date()
    user.save();
    res.status(201).send({ success: "Test has been submitted" });
  } catch (error) {
    res.status(400).send(error);
  }
};

// function getCurrentIndianDateTime(date){
//   date = date
//   var moment = require('moment-timezone');
//   var time = moment.tz('Asia/Calcutta').format("YYYY-MM-DDTHH:MM:ss");
//   return new Date(time);
// }
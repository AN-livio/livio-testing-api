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
    let l1 = allQuestions.filter((el) => el.levelTag == "level1");
    l1.sort(() => Math.random() - 0.5);
    let l2 = allQuestions.filter((el) => el.levelTag == "level2");
    l2.sort(() => Math.random() - 0.5);
    let l3 = allQuestions.filter((el) => el.levelTag == "level3");
    l3.sort(() => Math.random() - 0.5);
    let l4 = allQuestions.filter((el) => el.levelTag == "level4");
    l4.sort(() => Math.random() - 0.5);
    let l5 = allQuestions.filter((el) => el.levelTag == "level5");
    l5.sort(() => Math.random() - 0.5);
    let test = {
      l1: [l1[0], l1[1]],
      l2: [l2[0], l2[1]],
      l3: [l3[0], l3[1]],
      l4: [l4[0], l4[1]],
      l5: [l5[0], l5[1]],
    };
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
    let date = new Date();
    user.lastTestDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    user.save();
    res.status(201).send({ success: "Test has been submitted" });
  } catch (error) {
    res.status(400).send(error);
  }
};

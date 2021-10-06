const User = require("../models/user");
const Question = require("../models/question");
const mail = require("../utils/mailUtility");

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

//we are saving 1 unit score for each question in database and using controller can adjust their weights
module.exports.submitTest = async (req, res) => {
  try {
    let { email, totalScore, individualScore } = req.body;
    let user = await User.findOne({ email });
    user.individualScore = individualScore;
    user.totalScore = totalScore;
    user.lastTestDate = new Date();
    user.save();

    let emailScoreString = "";
    let totalScoreForEmail = 0;
    for (let y in user.individualScore) {
      emailScoreString += `<b>Level ${Number(y) + 1}: ${
        user.individualScore[y] * (Number(y) + 1)
      } / ${2 * (Number(y) + 1)}</b><br>`;
      totalScoreForEmail += user.individualScore[y] * (Number(y) + 1);
    }

    mail(
      "anirudh@golivio.com",
      "info@golivio.com",
      "Livio Screening Report",
      `<h3>Email: ${email}</h3><hr>${emailScoreString}<br>Total Score: ${totalScoreForEmail} / 30 <hr> <br> Submitted On: ${user.lastTestDate.toLocaleString(
        "en-US",
        {
          timeZone: "Asia/Calcutta",
        }
      )}`
    );
    res.status(201).send({ success: "Test has been submitted" });
  } catch (error) {
    res.status(400).send(error);
  }
};

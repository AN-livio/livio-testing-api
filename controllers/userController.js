const otpGenerator = require("otp-generator");

const User = require("../models/user");
const Question = require("../models/question");
const mail = require("../utils/mailUtility");
const { generateUploadURL } = require("../utils/s3");

module.exports.newUser = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      let object = req.body;
      if (!object.college) object.college = "NA";
      user = new User(object);

      await user.save();
    }

    let otp = otpGenerator.generate(6);

    mail(
      email,
      "info@golivio.com",
      "Email Verification - Screening Test",
      `Enter the following security code: <br/> ${otp}`
    );

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
    res.status(201).send({ user, test, otp });
  } catch (error) {
    res.status(400).send(error);
  }
};

//we are saving 1 unit score for each question in database and using controller can adjust their weights
module.exports.submitTest = async (req, res) => {
  try {
    let { email, totalScore, individualScore, hiringManagerEmail } = req.body;
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
      "ishwari@golivio.com",
      "info@golivio.com",
      "Livio Screening Report",
      `<h3>Email: ${email}</h3><hr>${emailScoreString}<br>Total Score: ${totalScoreForEmail} / 30 <hr> <br> Submitted On: ${user.lastTestDate.toLocaleString(
        "en-US",
        {
          timeZone: "Asia/Calcutta",
        }
      )}`
    );

    if (hiringManagerEmail) {
      mail(
        hiringManagerEmail,
        "info@golivio.com",
        "Livio Screening Report",
        `<h3>Email: ${email}</h3><hr>${emailScoreString}<br>Total Score: ${totalScoreForEmail} / 30 <hr> <br> Submitted On: ${user.lastTestDate.toLocaleString(
          "en-US",
          {
            timeZone: "Asia/Calcutta",
          }
        )}`
      );
    }
    const url = await generateUploadURL();
    res.status(201).send({ success: "Test has been submitted", url });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.submitResume = async (req, res) => {
  try {
    const { email, name, resumeURL, hiringManagerEmail,jobPost } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("No user found!");
    }

    mail(
      "ishwari@golivio.com",
      "info@golivio.com",
      `Resume - ${name} - ${email} - ${jobPost}`,
      `Candidate Resume: <br/> ${resumeURL}`
    );

    mail(
      hiringManagerEmail,
      "info@golivio.com",
      `Resume - ${name} - ${email} - ${jobPost}`,
      `Candidate Resume: <br/> ${resumeURL}`
    );

    res.status(201).send({ success: "Resume saved successfully!" });
  } catch (error) {
    res.status(400).send(error);
  }
};

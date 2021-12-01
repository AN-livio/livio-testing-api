const User = require("../models/user");
const Question = require("../models/question");
const JSONtoCSV = require("json2csv").parse;

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const isPasswordMatch = password === user.password;
    if (!isPasswordMatch) {
      return res.status(401).send({ error: "Invalid Password" });
    }
    const token = await user.generateAuthToken();
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.logout = async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.addQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).send({ success: "question added", question });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.body._id);
    res.status(201).send({ success: "question deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.getAllQuestions = async (req, res) => {
  try {
    let questions = await Question.find({});
    res.status(200).send({ questions });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.getQuestion = async (req, res) => {
  try {
    let { id } = req.body;
    let question = await Question.findById(id);
    let s = id + "some ";
    res.status(200).send({ question, s });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.getcsv = async (req, res) => {
  try {
    let users = await User.find({
      lastTestDate: { $exists: true },
      role: "User",
    });
    let formattedUsers = [];

    for (let x in users) {
      let userObj = {
        name: users[x].name,
        email: users[x].email,
        submission: users[x].lastTestDate.toLocaleString("en-US", {
          timeZone: "Asia/Calcutta",
        }),
      };

      let totalScore = 0;

      for (let y in users[x].individualScore) {
        userObj[`level ${Number(y) + 1}`] = `${
          users[x].individualScore[y] * (Number(y) + 1)
        }/${2 * (Number(y) + 1)}`;
        totalScore += users[x].individualScore[y] * (Number(y) + 1);
      }

      userObj.totalScore = `${totalScore}/30`;
      formattedUsers.push(userObj);
    }
    let csv = JSONtoCSV(formattedUsers);
    res.header("Content-Type", "text/csv");
    res.attachment("result.csv");
    res.send(csv);
  } catch (error) {
    res.status(400).send(error);
  }
};

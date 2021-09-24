const User = require("../models/user");
const Question = require("../models/question");

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

module.exports.getcsv = async (req, res) => {
  try {
    let users = await User.find({
      lastTestDate: { $exists: true },
      role: "User",
    });
    res.status(200).send({ users });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.getScorecard = async (req, res) => {
  try {
    let { email, date, score } = req.query;
    let users;
    if (!email && !date) {
      throw new Error("No query");
    } else if (date) {
      if (score) {
        users = await User.find({
          lastTestDate: date,
          totalScore: { $gte: score },
        });
      } else {
        users = await User.find({
          lastTestDate: date,
        });
      }
    } else if (email) {
      users = await User.find({ email });
    }
    res.status(200).send({ users });
  } catch (error) {
    res.status(400).send(error);
  }
};

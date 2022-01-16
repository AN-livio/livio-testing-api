const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
// let { jwtkey } = require("../config.json");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    },
  },
  college: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    default: "User",
  },
  resumeURL: {
    type: String,
    required: true,
    trim: true,
    default: "NA",
  },
  appliedFor: {
    type: String,
    trim: true,
    default: "NA",
  },
  exp: {
    type: String,
    required: true,
    trim: true,
    default: "NA",
  },
  workStatus: {
    type: String,
    required: true,
    trim: true,
    default: "NA",
  },
  highestDegree: {
    type: String,
    required: true,
    trim: true,
    default: "NA",
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    minLength: 7,
  },
  token: {
    type: String,
  },
  lastTestDate: {
    type: Date,
  },
  individualScore: {
    type: Array,
  },
  totalScore: {
    type: Number,
  },
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWTKEY);
  user.token = token;
  await user.save();
  return token;
};
const User = mongoose.model("User", userSchema);

module.exports = User;

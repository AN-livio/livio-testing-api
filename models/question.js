const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  questionImg: {
    type: String,
  },
  optionA: {
    type: String,
    required: true,
  },
  aImg: {
    type: Boolean,
    required: true,
  },
  optionB: {
    type: String,
    required: true,
  },
  bImg: {
    type: Boolean,
    required: true,
  },
  optionC: {
    type: String,
    required: true,
  },
  cImg: {
    type: Boolean,
    required: true,
  },
  optionD: {
    type: String,
    required: true,
  },
  dImg: {
    type: Boolean,
    required: true,
  },
  answerOption: {
    type: String,
    required: true,
  },
  levelTag: {
    type: String,
    required: true,
    default: "level1",
    trim: true,
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;

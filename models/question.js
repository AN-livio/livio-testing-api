const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  questionImg: {
    type: String,
    trim: true,
  },
  optionA: {
    type: String,
    required: true,
    trim: true,
  },
  aImg: {
    type: Boolean,
    required: true,
  },
  optionB: {
    type: String,
    required: true,
    trim: true,
  },
  bImg: {
    type: Boolean,
    required: true,
  },
  optionC: {
    type: String,
    required: true,
    trim: true,
  },
  cImg: {
    type: Boolean,
    required: true,
  },
  optionD: {
    type: String,
    required: true,
    trim: true,
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

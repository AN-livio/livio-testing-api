const mongoose = require("mongoose");
// const { user, password } = require("../config.json");

mongoose.connect(
  `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.msb4t.mongodb.net/livio-screening?retryWrites=true&w=majority`
);

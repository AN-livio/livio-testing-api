const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const { jwtkey } = require("../config.json");

const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) throw new Error("no token");
    token = token.replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWTKEY);
    const user = await User.findOne({ _id: data._id, token: token });
    if (!user || user.role !== "Admin") {
      throw new Error("Not authorized to access this resource");
    }
    req.user = user;
    next();
  } catch (error) {
    let { message } = error;
    res.status(401).send({ error: message });
  }
};
module.exports = auth;

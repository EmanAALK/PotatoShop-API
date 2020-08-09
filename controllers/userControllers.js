const bcrypt = require("bcrypt");

//Database
const { User } = require("../db/models");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create(req.body);
    res.json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

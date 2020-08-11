const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRATION_MS, JWT_SECERET } = require("./config/keys");

//Models
const { User } = require("../db/models");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 1;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res, next) => {
  console.log("exports.signin -> req", req);
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    expires: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECERET);
  res.json({ token });
};

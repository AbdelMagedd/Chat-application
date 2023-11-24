const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  const jwtkey = process.env.JWT_SECRET;

  return jwt.sign({ id }, jwtkey, { expiresIn: process.env.JWT_LIFETIME });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already registered" });
    }

    if (!name || !email || !password || !validator.isEmail(email)) {
      return res
        .status(400)
        .json({ msg: "Please provide valid data for registration" });
    }

    user = new userModel({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    const token = createToken(user._id);

    res.status(200).json({ token, name, email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error happened" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(403).json({ msg: "Invalid password or email" });
  }

  const token = createToken(user._id);

  res
    .status(200)
    .json({ token, name: user.name, email: user.email, _id: user._id });
};

const findUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error happened" });
  }
};

const findUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error happened" });
  }
};

module.exports = { registerUser, login, findUser, findUsers };

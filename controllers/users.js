const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const getUsers = async (req, res) => {
  let { limit = 5, start = 0 } = req.query;
  const filter = { state: true };
  isNaN(Number(start)) ? (start = 0) : null;

  // Slower bro :c one by one
  // const users = await User.find().limit(Number(limit)).skip(Number(start));
  // const total = await User.countDocuments();

  // Faster simultaneous
  const [total, users] = await Promise.all([
    User.countDocuments(filter),
    User.find(filter).limit(Number(limit)).skip(Number(start)),
  ]);

  res.json({ total, users });
};

const postUsers = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encript password
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(password, salt);

  // Save to db
  await user.save();

  res.json({
    user,
  });
};

const putUsers = async (req, res) => {
  const { id } = req.params;
  const { name, password, role, state, ...info } = req.body;

  const userUpdated = { name, role, state };
  // Validate db

  if (password) {
    const salt = await bcrypt.genSalt();
    userUpdated.password = await bcrypt.hash(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, userUpdated);

  res.json(user);
};

const deleteUsers = async (req, res) => {
  const id = req.params.id;

  // Really from db
  // const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(id, { state: false });
  res.json(user);
};

module.exports = { getUsers, postUsers, putUsers, deleteUsers };

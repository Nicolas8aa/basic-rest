const { response, request } = require("express");
const getUsers = (req, res) => {
  const { q, name, page = 1 } = req.query;

  res.status(403).json({
    msg: "no authorized loko",
    q,
    name,
    page,
  });
};

const postUsers = (req, res = response) => {
  const { name, age } = req.body;
  res.json({
    msg: "Posting some nigga",
    name,
    age,
  });
};

const putUsers = (req, res) => {
  const id = req.params.id;
  res.json({
    msg: "Putting some nigga",
    id,
  });
};

const deleteUsers = (req, res) => {
  res.json({
    msg: "Deleting noooo :c",
  });
};
const patchUsers = (req, res) => {
  res.json({
    msg: "patching jmmmm",
  });
};

module.exports = { getUsers, postUsers, putUsers, deleteUsers, patchUsers };

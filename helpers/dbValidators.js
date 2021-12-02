const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) throw new Error(`Role ${role} does not exist in database`);
};

const existEmail = async (email = "") => {
  // Validate email

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error("Email already registered :c");
  }
};
const existUser = async (id) => {
  // Validate email

  const userExists = await User.findById(id);
  if (!userExists) {
    throw new Error(`id ${id} does not exist`);
  }
};

module.exports = { isValidRole, existEmail, existUser };

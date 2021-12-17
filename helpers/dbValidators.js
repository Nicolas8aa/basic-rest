const { Category, Role, User, Product } = require("../models");

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

const existCategory = async (id = "") => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error(`Category with id ${id} does not exist`);
  }
  if (!category.status)
    throw new Error(`Category with id ${id} is inactive, talk to admin bro`);
};

const existProduct = async (id = "") => {
  const product = await Product.findById(id);
  if (!product) throw new Error(`Product with id ${id} does not exist bro :c`);
  if (!product.status)
    throw new Error(`Product with id ${id} is not active, talk to admin`);
};

// Validate alllow collections

const allowedCollections = (collection = "", collections = []) => {
  const isAllow = collections.includes(collection);
  if (!isAllow)
    throw new Error(
      `Collection ${collection} forbidden, availables: ${collections}`
    );
  return true;
};

module.exports = {
  isValidRole,
  existEmail,
  existUser,
  existCategory,
  existProduct,
  allowedCollections,
};

const { isValidObjectId } = require("mongoose");
const { User, Product, Category } = require("../models");

const collectionsAllowed = ["users", "categories", "products", "roles"];

const searchUsers = async (query = "", res) => {
  const isMongoId = isValidObjectId(query);
  if (isMongoId) {
    const user = await User.findById(query);
    return res.json({ results: user ? [user] : [] });
  }

  const regex = new RegExp(query, "i");
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });
  return res.json({ results: users });
};

const searchProducts = async (query = "", res) => {
  const isMongoId = isValidObjectId(query);
  if (isMongoId) {
    const product = await Product.findById(query)
      .populate("category", "name")
      .populate("user", "name");
    return res.json({ results: product ? [product] : [] });
  }

  const regex = new RegExp(query, "i");
  const products = await Product.find({
    $or: [{ name: regex }, { description: regex }],
    $and: [{ status: true }],
  })
    .populate("category", "name")
    .populate("user", "name");
  return res.json({ results: products });
};

const searchCategories = async (query = "", res) => {
  const isMongoId = isValidObjectId(query);
  if (isMongoId) {
    const category = await Category.findById(query);
    return res.json({ results: category ? [category] : [] });
  }
  const regex = new RegExp(query, "i");
  const categories = await Category.find({
    name: regex,
    status: true,
  });
  res.json({ results: categories });
};

const search = async (req, res) => {
  const { collection, keyword } = req.params;

  if (!collectionsAllowed.includes(collection)) {
    return res
      .status(400)
      .json({ msg: `Collections allowed: ${collectionsAllowed}` });
  }

  switch (collection) {
    case "users":
      searchUsers(keyword, res);
      break;
    case "categories":
      searchCategories(keyword, res);
      break;
    case "products":
      searchProducts(keyword, res);
      break;
    default:
      res.status(500).json({ msg: "Some error try again bro" });
  }
};
module.exports = { search };

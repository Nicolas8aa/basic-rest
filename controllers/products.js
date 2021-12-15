const { Product, Category } = require("../models");

const getProducts = async (req, res) => {
  const { limit = 10, start = 0 } = req.query;
  const filter = { status: true };

  try {
    const [products, total] = await Promise.all([
      Product.find(filter)
        .limit(Number(limit))
        .skip(Number(start))
        .populate("user", "name")
        .populate("category", "name"),
      Product.countDocuments(filter),
    ]);

    res.json({
      total,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong, try again",
    });
  }
};
const getProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.json(product);
};
const postProduct = async (req, res) => {
  const { user, status, name, ...data } = req.body;

  const productDB = await Product.findOne({ name });
  if (productDB)
    return res.status(400).json({ msg: `Product ${name}, already registered` });

  data.user = req.user.uid;
  data.name = name.toUpperCase();
  try {
    const product = new Product(data);
    await product.save();

    res.json(product);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Something went wrong, try again" });
  }
};
const putProduct = async (req, res) => {
  const { id } = req.params;
  const { user, status, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }
  if (data.category) {
    // Validate category exists
    const category = await Category.findById(data.category);
    if (!category) return res.status(400).json({ msg: "Invalid category" });
  }

  data.user = req.user.uid;
  try {
    const product = await Product.findByIdAndUpdate(id, data, { new: true })
      .populate("user", "name")
      .populate("category", "name");
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong, try again" });
  }
};
const delProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong, try again",
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  delProduct,
};

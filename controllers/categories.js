const { Category } = require("../models");

const getCategories = async (req, res) => {
  const { limit = 10, start = 0 } = req.query;
  const filter = { status: true };

  isNaN(Number(start)) ? (start = 0) : null;

  try {
    const [categories, total] = await Promise.all([
      Category.find(filter)
        .limit(Number(limit))
        .skip(Number(start))
        .populate("owner", "name"),
      Category.countDocuments(filter),
    ]);

    res.json({
      total,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong, try again",
    });
  }
};

const getCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id).populate("owner", "name");

  res.json(category);
};

const postCategory = async (req, res) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });
  if (categoryDB) {
    return res.status(400).json({
      msg: `Category ${name}, already registered :c`,
    });
  }

  // Generate data to save
  const data = {
    name,
    owner: req.user.uid,
  };

  try {
    const category = new Category(data);
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong, try again :c",
    });
  }
};

const putCategory = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(
    id,
    {
      name: name.toUpperCase(),
      owner: req.user.uid,
    },
    { new: true }
  ).populate("owner", "name");
  return res.json({
    category,
  });
};

const delCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(id, { status: false });
    res.json(category);
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong bro :C",
    });
  }
};

module.exports = {
  getCategories,
  postCategory,
  getCategory,
  putCategory,
  delCategory,
};

const { Category } = require("../models");

const isCategoryOwner = async (req, res, next) => {
  const { uid } = req.user;
  const { id } = req.params;

  if (!id) return res.status(400).json({ msg: "Category id not found" });
  if (!uid) return res.status(404).json({ msg: "User is not authenticated" });

  const category = await Category.findById(id);

  if (!category.owner.toString() === uid) {
    return res.status(401).json({
      msg: "This category does not belong you :c",
    });
  }
  next();
};

module.exports = { isCategoryOwner };

const { Router } = require("express");
const { check } = require("express-validator");

const {
  validateJWT,
  validateFields,
  isCategoryOwner,
  isAdmin,
} = require("../middlewares");

const { existCategory } = require("../helpers/dbValidators");

const {
  getCategories,
  postCategory,
  getCategory,
  delCategory,
  putCategory,
} = require("../controllers/categories");

const router = Router();

router.get("/", [], getCategories);

// Get category by id - public
router.get(
  "/:id",
  [
    check("id", "Invalid category id").isMongoId(),
    check("id").custom(existCategory),
    validateFields,
  ],
  getCategory
);
// Create category - token required
router.post(
  "/",
  [validateJWT, check("name", "Name is required").notEmpty(), validateFields],
  postCategory
);

// Put category - token required
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Name is required").notEmpty(),
    check("id", "Invalid category id").isMongoId(),
    check("id").custom(existCategory),
    // isCategoryOwner,
    validateFields,
  ],
  putCategory
);

// Unactivating category - admin required
router.delete(
  "/:id",
  [
    validateJWT,
    isAdmin,
    check("id", "Invalid category id").isMongoId(),
    check("id").custom(existCategory),
    validateFields,
  ],
  delCategory
);
module.exports = router;

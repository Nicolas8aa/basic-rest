const { Router } = require("express");
const { check } = require("express-validator");

const {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  delProduct,
} = require("../controllers/products");
const { validateJWT, validateFields, isAdmin } = require("../middlewares");
const { existProduct, existCategory } = require("../helpers/dbValidators");

const router = Router();

router.get("/", getProducts);
router.get(
  "/:id",
  [
    check("id", "Invalid id").isMongoId(),
    check("id").custom(existProduct),
    validateFields,
  ],
  getProduct
);
router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is required").notEmpty(),
    check("category", "Category is required").notEmpty(),
    check("category", "Category is invalid").isMongoId(),
    check("category").custom(existCategory),
    validateFields,
  ],
  postProduct
);
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid category id").isMongoId(),
    check("id").custom(existProduct),
    validateFields,
  ],
  putProduct
);
router.delete(
  "/:id",
  [
    validateJWT,
    isAdmin,
    check("id", "Invalid category id").isMongoId(),
    check("id").custom(existProduct),
    validateFields,
  ],
  delProduct
);

module.exports = router;

const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateFileUpload } = require("../middlewares");
const { allowedCollections } = require("../helpers");

const {
  fileUpload,
  updateImg,
  showImage,
  updateImgCloud,
} = require("../controllers/uploads");

const router = Router();

router.post("/", validateFileUpload, fileUpload);

router.put(
  "/:collection/:id",
  [
    validateFileUpload,
    check("id", "Invalid id").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    validateFields,
  ],
  // updateImg
  updateImgCloud
);

router.get(
  "/:collection/:id",
  [
    check("id", "Invalid id").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    validateFields,
  ],
  showImage
);

module.exports = router;

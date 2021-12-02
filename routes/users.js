const { Router } = require("express");
const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
} = require("../controllers/users");
const router = Router();
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/fieldValidation");

const {
  isValidRole,
  existEmail,
  existUser,
} = require("../helpers/dbValidators");

router.get("/", getUsers);
router.post(
  "/",
  [
    check("name", "Required name").not().isEmpty(),
    check("password", "Password must be higher than 6 chars").isLength({
      min: 6,
    }),
    check("email", "Invalid email").isEmail(),
    check("role").custom(isValidRole),
    check("email").custom(existEmail),
    validateFields,
  ],
  postUsers
);
router.put(
  "/:id",
  [
    check("id", "Invalid id").isMongoId(),
    check("id").custom(existUser),
    check("role").custom(isValidRole),
    validateFields,
  ],
  putUsers
);
router.delete(
  "/:id",
  [
    check("id", "Invalid id").isMongoId(),
    check("id").custom(existUser),
    validateFields,
  ],
  deleteUsers
);
module.exports = router;

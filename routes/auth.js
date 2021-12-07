const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
const { validateFields } = require("../middlewares/fieldValidation");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is required bro").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  login
);
router.post(
  "/google",
  [check("id_token", "id_token is required").notEmpty(), validateFields],
  googleSignIn
);

module.exports = router;

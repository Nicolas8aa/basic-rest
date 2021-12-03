const fieldValidation = require("../middlewares/fieldValidation");
const JWTValidation = require("../middlewares/validateJWT");
const roleValidation = require("../middlewares/validateRole");

module.exports = {
  ...fieldValidation,
  ...JWTValidation,
  ...roleValidation,
};

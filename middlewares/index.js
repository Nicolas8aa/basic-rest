const fieldValidation = require("./fieldValidation");
const JWTValidation = require("./validateJWT");
const roleValidation = require("./validateRole");
const ownerValidation = require("./ownerValidation");
const validateFile = require("./validateFile");

module.exports = {
  ...fieldValidation,
  ...JWTValidation,
  ...roleValidation,
  ...ownerValidation,
  ...validateFile,
};

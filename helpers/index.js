const dbValidators = require("./dbValidators");
const genJWT = require("./genJWT");
const googleVerify = require("./googleVerify");
const uploadFile = require("./uploadFile");

module.exports = {
  ...dbValidators,
  ...genJWT,
  ...googleVerify,
  ...uploadFile,
};

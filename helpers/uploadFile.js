const path = require("path");
const { v4: uuid } = require("uuid");
const { User, Product } = require("../models");

const uploadFile = (
  files,
  validExts = ["png", "jpg", "jpeg", "gif"],
  folder = ""
) => {
  return new Promise((res, rej) => {
    const { file } = files;
    const splittedName = file.name.split(".");
    const ext = splittedName[splittedName.length - 1];

    // Validate extension
    const allowedExts = validExts;
    if (!allowedExts.includes(ext)) {
      return rej("Extension not allowed, valid extensions: " + validExts);
    }
    const tempName = uuid() + "." + ext;
    const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

    // Move file
    file.mv(uploadPath, (err) => {
      if (err) return rej(err);
    });
    res(tempName);
  });
};

const validateModel = (collection = "", id = "") => {
  return new Promise(async (res, rej) => {
    let model;

    switch (collection) {
      case "users":
        model = await User.findById(id);
        if (!model) {
          return rej(`Id ${id} does not exists in ${collection} collection`);
        }

        break;

      case "products":
        model = await Product.findById(id);
        if (!model) {
          return rej(`Id ${id} does not exists in ${collection} collection`);
        }

        break;
      default:
        return rej("Something went wrong");
    }
    res(model);
  });
};

module.exports = { uploadFile, validateModel };

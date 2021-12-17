const path = require("path");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { uploadFile, validateModel } = require("../helpers");
const { User, Product } = require("../models");

const fileUpload = async (req, res) => {
  try {
    const fileName = await uploadFile(req.files);
    res.json({ fileName });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const updateImg = async (req, res) => {
  const { id, collection } = req.params;

  let model;
  try {
    model = await validateModel(collection, id);
  } catch (msg) {
    return res.status(400).json({ msg });
  }

  // Clean images
  if (model.img) {
    const imgPath = path.join(__dirname, "../uploads", collection, model.img);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
  }

  try {
    model.img = await uploadFile(req.files, undefined, collection);
    await model.save();
    res.json(model);
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const updateImgCloud = async (req, res) => {
  const { id, collection } = req.params;

  let model;
  try {
    model = await validateModel(collection, id);
  } catch (msg) {
    return res.status(400).json({ msg });
  }

  // Clean image - cloudinary
  if (model.img) {
    const nameArr = model.img.split("/");
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split(".");

    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  model.img = secure_url;
  await model.save();

  res.json(model);
};

const showImage = async (req, res) => {
  const { collection, id } = req.params;

  let model;
  try {
    model = await validateModel(collection, id);
  } catch (msg) {
    return res.status(400).json({ msg });
  }

  // Return image file
  if (model.img) {
    const imgPath = path.join(__dirname, "../uploads", collection, model.img);
    if (fs.existsSync(imgPath)) {
      return res.sendFile(imgPath);
    }
  }

  res.sendFile(path.join(__dirname, "../public/assets/no-image.jpg"));
};

module.exports = { fileUpload, updateImg, showImage, updateImgCloud };

const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN, {
      useNewUrlParser: true,
    });
    console.log("Connected database :)");
  } catch (e) {
    throw new Error(e, "Awaking database error");
  }
};

module.exports = { dbConnection };

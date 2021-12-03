const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { genJWT } = require("../helpers/genJWT");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate if email exists

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        msg: "Email or password incorrect(s) - email",
      });

    // User is active
    if (!user.state)
      return res.status(400).json({
        msg: "Email or password incorrect(s) - inactive",
      });
    // Validate password
    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword)
      return res.status(400).json({
        msg: "Email or password incorrect(s) - password",
      });
    // Generate JWT
    const token = await genJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Something went wrong :c",
    });
  }
};

module.exports = { login };

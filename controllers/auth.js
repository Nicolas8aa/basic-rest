const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { genJWT } = require("../helpers/genJWT");
const { googleVerify } = require("../helpers/googleVerify");

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

const googleSignIn = async (req, res) => {
  const { id_token } = req.body;
  try {
    const { name, email, picture } = await googleVerify(id_token);

    let user = await User.findOne({ email });
    if (!user) {
      // Create user
      const info = { email, name, img: picture, google: true, password: "xdd" };
      user = new User(info);
      await user.save();
    }

    // Validate if user is active
    if (!user.state) {
      return res.status(401).json({
        msg: "User inactive, call the admin ",
      });
    }

    // Generate JWT
    const token = await genJWT(user.id);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Token cannot be validated",
    });
  }
};

module.exports = { login, googleSignIn };

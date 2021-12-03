const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req, res, next) => {
  const token = req.header("xj-token");

  if (!token) {
    return res.status(401).json({
      msg: "Not token found",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEY);

    const user = await User.findById(uid);

    // Validate user exists
    if (!user)
      return res.status(401).json({
        msg: "Invalid token - user not found",
      });

    // Validate the user is active
    if (!user.state)
      return res.status(401).json({
        msg: "Invalid token - inactive user",
      });

    req.user = user;

    next();
  } catch (e) {
    res.status(401).json({
      msg: "Invalid token",
    });
  }
};

module.exports = { validateJWT };

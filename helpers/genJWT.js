const jwt = require("jsonwebtoken");

const genJWT = (uid = "") => {
  return new Promise((res, rej) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          rej("Token cannot be generated :c");
        } else {
          res(token);
        }
      }
    );
  });
};

module.exports = { genJWT };

const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Token is not validated yet",
    });
  }

  const { role, name } = req.user;

  if (role !== "ADMIN") {
    res.status(401).json({
      msg: `${name} is not authorized to perform this action`,
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Token is not validated yet",
      });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `This action requiere this roles ${roles}`,
      });
    }
    next();
  };
};

module.exports = { isAdmin, hasRole };

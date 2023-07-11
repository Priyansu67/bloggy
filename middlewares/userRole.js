//Check if Role is admin or not
const { Role } = require("../models/userModel");

 const isAdmin = (req, res, next) => {
  if (req.user.role === Role.Admin) {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
};

module.exports = { isAdmin };
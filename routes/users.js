const router = require("express").Router();

const { createUser } = require("../controllers/userController");
const { login,auth } = require("../controllers/authController");

router.route("/register").post(createUser);
router.route("/login").post(login);
router.route("/auth").get(auth);

// /api/users/:userId
//router.route("/:userId").get(getUserById);

module.exports = router;

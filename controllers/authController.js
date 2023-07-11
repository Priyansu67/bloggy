const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input data
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token that expires in 1hour if the user is found and the password is valid and send it in the response
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY,{
        expiresIn: "1h",
    });

    // Send the response
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const auth = async (req, res) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({
            _id: decoded.userId,
        });
        if (!user) {
            throw new Error();
        }
        res.status(200).json({ message: "User authenticated successfully", user });
        
    } catch (error) {
        res.status(401).json({ error: "Please authenticate" });
    }
};

module.exports = { login,auth };
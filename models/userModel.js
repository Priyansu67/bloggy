const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Role = {
  Admin: "admin",
  User: "user",
};

const userSchema = new schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [Role.Admin, Role.User],
      default: Role.User,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);


module.exports = { User, Role };


const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MongoDB Connection
const db = require("./utils/connection");
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("MongoDB connection successful"));

//Routes
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

//Express static
app.use(
  express.static(path.join(__dirname, "build"))
);

//Serve react build files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "build", "index.html")
    );
  });
}

app.listen(process.env.PORT||5500, () =>
  console.log("Server running on port http://localhost:5500")
);

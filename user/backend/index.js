const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./config/db");
require("dotenv").config({ path: ".env" });
const morgan = require("morgan");
const cors = require("cors");

//connectv to mongoose server
connectDB();

//View engine has been set:
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

//Homepage:
app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "Hello this is John Doe" });
});

// Custom Routes for the app:
//routes:
app.use("/auth", require("./routes/auth"));
app.use('/courses', require('./routes/courses'));



//Not-Found Any Kind of path middleware
app.use("*", (req, res, next) => {
  res.status(404).json({ error: true, message: "Check your url" });
});

//connect to express server
app.listen(process.env.PORT || 4000, () => {
  console.log(process.env.BASE_URL + ` ✅`);
});

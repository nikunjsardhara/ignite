/* eslint-disable no-console */
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const morgan = require("morgan")
dotenv.config()

const app = express()
// Import Routes
const apiRoutes = require('./routes')
const connectDB = require("./config/db")
// Connect to DB
connectDB()

// Middleware
app.use(cors())
app.use(express.json(), express.urlencoded({ extended: false }))
// Morgan
app.use(morgan("tiny"))

app.use("/api", apiRoutes)
// Serve static assets if in production


if (process.env.NODE_ENV === "production") {
    //set admin frontend routes
    app.use("/admin", express.static("./frontend/admin_frontend/build"));
    app.use("/admin/login", express.static("./frontend/admin_frontend/build"));
    app.use("/admin/dashboard", express.static("./frontend/admin_frontend/build"));
    app.use("/admin/users", express.static("./frontend/admin_frontend/build"));
    app.use("/admin/add-new-user", express.static("./frontend/admin_frontend/build"));
    app.use("/admin/user/:id", express.static("./frontend/admin_frontend/build"));
    app.use("/admin/roles", express.static("./frontend/admin_frontend/build"));
    app.use("/admin/role/:id", express.static("./frontend/admin_frontend/build"));
    app.use("/admin/add-new-role", express.static("./frontend/admin_frontend/build"));
    app.use("/admin/door-submissions", express.static("./frontend/admin_frontend/build"));
    app.use("/admin/designed-door", express.static("./frontend/admin_frontend/build"));
    
    //route for submit door ( universal Route )
    app.use("/submit-door", express.static("./frontend/admin_frontend/build"));

  // set user frontend routes.
  app.use("/", express.static("./frontend/user_frontend/build"));
  app.use("/crop", express.static("./frontend/user_frontend/build"));
  app.use("/designer", express.static("./frontend/user_frontend/build"));
  app.use("/streetview", express.static("./frontend/user_frontend/build"));

}

module.exports = app.listen(process.env.PORT || 4000, () =>
  console.log("Server up and running", process.env.PORT || 4000)
)
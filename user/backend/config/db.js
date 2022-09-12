const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const connectDB = async () => {
  // for mongodb atlas
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Mongoose ✅");
    })
    .catch((error) => {
      console.log("Mongoose Error ❌ ", error);
      process.exit(1);
    });
};

module.exports = connectDB;

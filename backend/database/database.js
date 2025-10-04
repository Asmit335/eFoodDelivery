const mongoose = require("mongoose");

const connectMongoDb = async () => {
  await mongoose.connect(process.env.Mongo_Uri);
  console.log("Database connected Successfully.");
};

module.exports = connectMongoDb;

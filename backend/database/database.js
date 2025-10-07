const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const connectMongoDb = async () => {
  await mongoose.connect(process.env.Mongo_Uri);
  console.log("Database connected Successfully.");

  //adminDatabaseseeder
  const isAdminSeeded = await User.findOne({ email: "asmitadmin@gmail.com" });
  if (!isAdminSeeded) {
    await User.create({
      email: "asmitadmin@gmail.com",
      password: bcrypt.hashSync("admin", 10),
      phoneNumber: "1234567890",
      userName: "asmit",
      role: "admin",
    });
    console.log("Admin Data Seeded Successfully.");
  } else {
    console.log("Admin already Existed.");
  }
};

module.exports = connectMongoDb;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      select: false,
    },
    userName: {
      type: String,
      required: [true, "Name is required"],
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    otp: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const User = require("./model/userModel");
const connectMongoDb = require("./database/database");
const authRoute = require("./routes/auth/authRoutes");
const productRoute = require("./routes/admin/productRoutes");
const adminUserRoute = require("./routes/admin/adminUserRoute");
const userReviewRoute = require("./routes/user/userReviewRoute");

const app = express();
env.config();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

const PORT = process.env.PORT;
connectMongoDb();

app.get("/", async (req, res) => {
  const user = await User.find();
  res.status(200).json({
    message: "User read successfully.",
    data: user,
  });
});

//user register/signup api, user login api
app.use("", authRoute);
app.use("", productRoute);
app.use("", adminUserRoute);
app.use("", userReviewRoute);

app.listen(PORT, () => {
  console.log("The server is running in Port:", PORT);
});

const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const User = require("./model/userModel");
const connectMongoDb = require("./database/database");
const authRoute = require("./routes/auth/authRoutes");
const productRoute = require("./routes/admin/productRoutes");
const adminUserRoute = require("./routes/admin/adminUserRoute");
const userReviewRoute = require("./routes/user/userReviewRoute");
const profileRoute = require("./routes/user/profileRoute");
const cartRoute = require("./routes/user/cartRoute");
const admingetOrderRoute = require("./routes/admin/adminOrderRoute");
const userOrderRouter = require("./routes/user/orderRoute");
const khaltiPaymentRouter = require("./routes/user/paymentRoute");
const { Server } = require("socket.io");

const app = express();
env.config();
app.use(
  cors({
    origin: "*",
  })
);

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
app.use("/admin", adminUserRoute);
app.use("", userReviewRoute);
app.use("", profileRoute);
app.use("/cart", cartRoute);
app.use("/admin/order", admingetOrderRoute);
app.use("/order", userOrderRouter);
app.use("/payment", khaltiPaymentRouter);

const server = app.listen(PORT, () => {
  console.log("The server is running in Port:", PORT);
});

const io = new Server(server);

io.on("connection", (socket) => {
  // console.log("A user is connected.");
  socket.on("join", (data) => {
    console.log(data);
  });
});

function getSocketIo() {
  return io;
}
module.exports.getSocketIo = getSocketIo;

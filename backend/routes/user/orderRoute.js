const express = require("express");
const isAuthenticated = require("../../middleware/isAuthenticated");
const { catchAsync } = require("../../services/catchAsync");
const {
  getOrderItem,
  orderedItems,
} = require("../../controller/users/order/orderController");
const router = express.Router();

router
  .route("/user")
  .get(isAuthenticated, catchAsync(getOrderItem))
  .post(isAuthenticated, orderedItems);

module.exports = router;

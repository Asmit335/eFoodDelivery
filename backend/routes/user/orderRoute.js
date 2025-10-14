const express = require("express");
const isAuthenticated = require("../../middleware/isAuthenticated");
const { catchAsync } = require("../../services/catchAsync");
const {
  getOrderItem,
  orderedItems,
  updateMyOrder,
  deleteMyOrder,
  cancelOrderStatus,
} = require("../../controller/users/order/orderController");
const router = express.Router();

router
  .route("/user")
  .get(isAuthenticated, catchAsync(getOrderItem))
  .post(isAuthenticated, orderedItems);

router.route("/cancel").patch(isAuthenticated, catchAsync(cancelOrderStatus));

router
  .route("/:id")
  .patch(isAuthenticated, catchAsync(updateMyOrder))
  .delete(isAuthenticated, catchAsync(deleteMyOrder));

module.exports = router;

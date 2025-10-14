const express = require("express");
const isAuthenticated = require("../../middleware/isAuthenticated");
const { catchAsync } = require("../../services/catchAsync");

const {
  getAllOrderItems,
} = require("../../controller/admin/order/orderController");
const router = express.Router();

router.route("").get(isAuthenticated, catchAsync(getAllOrderItems));

module.exports = router;

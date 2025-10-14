const express = require("express");
const isAuthenticated = require("../../middleware/isAuthenticated");
const { catchAsync } = require("../../services/catchAsync");
const {
  getAllOrderItems,
  updateOrderStatusByAdmin,
  deleteOrderStatusByAdmin,
} = require("../../controller/admin/order/orderController");
const restricTocreateProduct = require("../../middleware/restrictTocreate");
const router = express.Router();

router
  .route("/")
  .get(
    isAuthenticated,
    restricTocreateProduct("admin"),
    catchAsync(getAllOrderItems)
  );
router
  .route("/:id")
  .get(
    isAuthenticated,
    restricTocreateProduct("admin"),
    catchAsync(getAllOrderItems)
  )
  .patch(
    isAuthenticated,
    restricTocreateProduct("admin"),
    catchAsync(updateOrderStatusByAdmin)
  )
  .delete(
    isAuthenticated,
    restricTocreateProduct("admin"),
    catchAsync(deleteOrderStatusByAdmin)
  );
module.exports = router;

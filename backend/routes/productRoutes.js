const express = require("express");
const { createProduct } = require("../controller/admin/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const restricTocreateProduct = require("../middleware/restrictTocreate");
const router = express.Router();

router
  .route("/createproduct")
  .post(isAuthenticated, restricTocreateProduct("admin"), createProduct);

module.exports = router;

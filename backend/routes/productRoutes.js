const express = require("express");
const { createProduct } = require("../controller/admin/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const restricTocreateProduct = require("../middleware/restrictTocreate");
const router = express.Router();

const { multer, storage } = require("../middleware/multerConfig");
const upload = multer({ storage });

router
  .route("/createproduct")
  .post(
    isAuthenticated,
    restricTocreateProduct("admin"),
    upload.single("productImage"),
    createProduct
  );

module.exports = router;

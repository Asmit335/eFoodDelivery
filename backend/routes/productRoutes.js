const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/admin/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const restricTocreateProduct = require("../middleware/restrictTocreate");
const router = express.Router();

const { multer, storage } = require("../middleware/multerConfig");
const { catchAsync } = require("../services/catchAsync");
const upload = multer({ storage });

router
  .route("/createproduct")
  .post(
    isAuthenticated,
    restricTocreateProduct("admin"),
    upload.single("productImage"),
    createProduct
  )
  .get(catchAsync(getProducts));

router
  .route("/product/:id")
  .get(catchAsync(getProduct))
  .delete(
    isAuthenticated,
    restricTocreateProduct("admin"),
    catchAsync(deleteProduct)
  )
  .patch(
    isAuthenticated,
    restricTocreateProduct("admin"),
    upload.single("productImage"),
    catchAsync(updateProduct)
  );

module.exports = router;

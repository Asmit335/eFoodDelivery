const ProductM = require("../../model/productModel");
exports.createProduct = async (req, res) => {
  const {
    productName,
    productDescription,
    productStockQuantity,
    productPrice,
    productStatus,
  } = req.body;

  if (
    !productName ||
    !productDescription ||
    !productStockQuantity ||
    !productPrice ||
    !productStatus
  ) {
    return res.status(400).json({
      message: "Please fill all the details.",
    });
  }

  await ProductM.create({
    productName,
    productDescription,
    productStockQuantity,
    productPrice,
    productStatus,
  });
  res.status(200).json({
    message: "Product created Successfully.",
  });
};

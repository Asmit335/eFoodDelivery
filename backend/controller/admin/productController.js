const ProductM = require("../../model/productModel");
exports.createProduct = async (req, res) => {
  const file = req.file;
  let filePath;
  if (!file) {
    filePath = "https://www.asmitkhanal.com.np/images/profile-1.jpeg";
  } else {
    file = req.file.filename;
  }

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
    productImage: filePath,
  });
  res.status(200).json({
    message: "Product created Successfully.",
  });
};

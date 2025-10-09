const ProductM = require("../../model/productModel");
const fs = require("fs");
exports.createProduct = async (req, res) => {
  try {
    const file = req.file;
    let filePath;
    if (!file) {
      filePath = "https://www.asmitkhanal.com.np/images/profile-1.jpeg";
    } else {
      file = file.filename;
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
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

exports.getProducts = async (req, res) => {
  const products = await ProductM.find();
  if (products.length === 0) {
    res.status(400).json({
      message: "Product Not found",
      products: [],
    });
  } else {
    res.status(200).json({
      message: "Products fetched Successfully.",
      products,
    });
  }
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please give productID .",
    });
  }
  const product = await ProductM.findById({ _id: id });
  if (!product) {
    res.status(400).json({
      message: "No product found with the given productID .",
    });
  } else {
    res.status(200).json({
      message: "Product fetched Successfully.",
      product,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: "Please give productID .",
    });
  }
  const oldData = await ProductM.findById(id);
  if (!oldData) {
    return res.status(404).json({
      message: "No data found with that id",
    });
  }
  const oldProductImage = oldData.productImage;

  if (req.file && req.file.filename) {
    fs.unlink("./uploads/" + oldProductImage, (err) => {
      if (err) {
        console.log("Error deleting file.", err);
      } else {
        console.log("File deleted Successfully.");
      }
    });
  }
  await ProductM.findByIdAndDelete({ _id: id });
  res.status(200).json({
    message: "Product Deleted Successfully.",
  });
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
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

    const oldData = await ProductM.findById(id);
    if (!oldData) {
      return res.status(404).json({
        message: "No data found with that id",
      });
    }
    const oldProductImage = oldData.productImage;

    if (req.file && req.file.filename) {
      fs.unlink("./uploads/" + oldProductImage, (err) => {
        if (err) {
          console.log("Error deleting file.", err);
        } else {
          console.log("File deleted Successfully.");
        }
      });
    }

    const datas = await ProductM.findByIdAndUpdate(
      id,
      {
        productName,
        productDescription,
        productStockQuantity,
        productPrice,
        productStatus,
        productImage:
          req.file && req.file.filename ? req.file.filename : oldProductImage,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Product Updated Successfully.",
      data: datas,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

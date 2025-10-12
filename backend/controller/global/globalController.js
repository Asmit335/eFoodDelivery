const ProductM = require("../../model/productModel");
const ReviewM = require("../../model/reviewModel");

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
  const productReviews = await ReviewM.find({ productId: id }).populate(
    "userId"
  );
  if (!product) {
    res.status(400).json({
      message: "No product found with the given productID .",
      product: [],
      productReviews: [],
    });
  } else {
    res.status(200).json({
      message: "Product fetched Successfully.",
      product,
      productReviews,
    });
  }
};

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Product Name is required."],
    },
    productDescription: {
      type: String,
      required: [true, "productDescription is required."],
    },
    productStockQuantity: {
      type: Number,
      required: [true, "productStockQuantity is required."],
    },
    productPrice: {
      type: Number,
      required: [true, "productPrice is required."],
    },
    productStatus: {
      type: String,
      enum: ["available", "unavailable"],
      // required: [true, "productStatus is required."],
    },
    productImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ProuductM = mongoose.model("Product", productSchema);
module.exports = ProuductM;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewModel = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userid is necessary"],
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "productID is necessary."],
    },
    rating: {
      type: Number,
      required: true,
      default: 3,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReviewM = mongoose.model("Review", reviewModel);
module.exports = ReviewM;

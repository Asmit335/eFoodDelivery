const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    item: [
      {
        quantity: { type: Number, required: true },
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    orderStatus: {
      type: String,
      enum: ["pending", "delivered", "cancelled", "ontheway", "preparation"],
      default: "pending",
    },
    paymentStatus: {
      pidx: { type: String },
      method: {
        type: String,
        enum: ["COD", "Khalti", "Pending"],
        default: "Pending",
      },
      status: {
        type: String,
        enum: ["paid", "unpaid", "pending"],
        default: "pending",
      },
    },
  },
  {
    timestamps: true,
  }
);

const OrderM = mongoose.model("Order", orderSchema);
module.exports = OrderM;

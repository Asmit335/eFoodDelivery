const OrderM = require("../../../model/orderModel");

exports.orderedItems = async (req, res) => {
  const userId = req.user.id;
  const { item, shippingAddress, paymentStatus, totalAmount } = req.body;

  if (!item || item.length === 0 || !shippingAddress || !paymentStatus) {
    return res.status(400).json({ message: "Please fill all the details ." });
  }

  const orderData = await OrderM.create({
    user: userId,
    item,
    shippingAddress,
    paymentStatus,
    totalAmount,
  });
  res.status(200).json({
    message: "Order Created Successfully.",
    data: orderData,
  });
};

exports.getOrderItem = async (req, res) => {
  const userId = req.user.id;
  const orders = await OrderM.find({ user: userId }).populate({
    path: "item.product",
    model: "Product",
    select: "-productStockQuantity -createdAt -updatedAt -__v",
  });
  if (orders.length === 0) {
    return res.status(404).json({
      message: "Empty ordered item.",
      data: [],
    });
  }
  res.status(200).json({
    message: "Order fetched Successfully.",
    data: orders,
  });
};

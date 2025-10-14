const OrderM = require("../../../model/orderModel");

exports.getAllOrderItems = async (req, res) => {
  const orderedItems = await OrderM.find().populate({
    path: "item.product",
    model: "Product",
  });
  if (orderedItems.length === 0) {
    return res.status(404).json({
      message: "Empty ordered item.",
      data: [],
    });
  }
  res.status(200).json({
    message: "All Ordered fetched successfully by admin.",
    data: orderedItems,
  });
};

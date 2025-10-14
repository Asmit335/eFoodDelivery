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

exports.getSingleOrderByAdmin = async (req, res) => {
  const { id } = req.params;

  const order = await OrderM.findById(id);
  if (!order) {
    return res.status(404).json({
      message: "No any order with the given ID.",
    });
  }
  res.status(200).json({
    message: "Single order fetched Successfully.",
    data: order,
  });
};

exports.updateOrderStatusByAdmin = async (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  if (
    !orderStatus ||
    !["pending", "delivered", "cancelled", "ontheway", "preparation"].includes(
      orderStatus.toLowerCase()
    )
  ) {
    return res.status(400).json({
      message: "Please fill the field or orderStatus is invalid",
    });
  }

  const order = await OrderM.findById(id);
  if (!order) {
    return res.status(404).json({
      message: "No order with the given ID.",
    });
  }

  const updateorderstatus = await OrderM.findByIdAndUpdate(
    id,
    {
      orderStatus,
    },
    { new: true }
  );
  res.status(200).json({
    message: "Order status changed by Admin Successfully.",
    data: updateorderstatus,
  });
};

exports.deleteOrderStatusByAdmin = async (req, res) => {
  const { id } = req.params;
  const order = await OrderM.findById(id);
  if (!order) {
    return res.status(404).json({
      message: "No order with the given ID.",
    });
  }
  const deleteOrder = await OrderM.findByIdAndDelete(id);
  res.status(200).json({
    message: "Order deleted Successfully.",
    data: [],
  });
};

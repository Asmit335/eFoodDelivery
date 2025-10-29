const OrderM = require("../../../model/orderModel");

exports.orderedItems = async (req, res) => {
  const userId = req.user.id;
  const { item, shippingAddress, paymentStatus, totalAmount, phoneNumber } =
    req.body;

  if (
    !item ||
    item.length === 0 ||
    !shippingAddress ||
    !paymentStatus ||
    !phoneNumber
  ) {
    return res.status(400).json({ message: "Please fill all the details ." });
  }

  const orderData = await OrderM.create({
    user: userId,
    item,
    shippingAddress,
    paymentStatus,
    totalAmount,
    phoneNumber,
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

exports.updateMyOrder = async (req, res) => {
  const userid = req.user.id;
  const { id } = req.params;
  const { shippingAddress, item } = req.body;
  if (!shippingAddress || item.length === 0) {
    return res.status(400).json({
      message: "Please fill all the details.",
    });
  }
  const existOrderId = await OrderM.findOne({ _id: id, user: userid });

  if (!existOrderId) {
    res.status(404).json({
      message: "YOu arenot authorize to do perform this action.",
    });
  }

  if (existOrderId.orderStatus === "ontheway") {
    res.status(400).json({
      message: "You cannot update the product when it is onTheWay.",
    });
  }
  const updatedOrder = await OrderM.findByIdAndUpdate(
    id,
    { shippingAddress, item },
    { new: true }
  );
  res.status(200).json({
    message: "Order updated Successfully.",
    data: updatedOrder,
  });
};

exports.deleteMyOrder = async (req, res) => {
  const userid = req.user.id;
  const { id } = req.params;

  const existOrderId = await OrderM.findOne({ _id: id, user: userid });

  if (!existOrderId) {
    return res.status(404).json({
      message: "You are not authorized to perform this action.",
    });
  }

  // Only allow deletion if status is pending
  if (existOrderId.orderStatus !== "pending") {
    return res.status(400).json({
      message: "You can only delete orders that are still pending status.",
    });
  }

  await OrderM.findByIdAndDelete(id);

  return res.status(200).json({
    message: "Order deleted successfully.",
  });
};

exports.cancelOrderStatus = async (req, res) => {
  const userid = req.user.id;
  const { id } = req.params;

  const existOrderId = await OrderM.findOne({ _id: id, user: userid });

  if (!existOrderId) {
    return res.status(404).json({
      message: "You are not authorized to perform this action.",
    });
  }

  if (existOrderId.orderStatus !== "pending") {
    return res.status(400).json({
      message: "You can only cancel orders that are still pending status.",
    });
  }

  const updateorderStatus = await OrderM.findByIdAndUpdate(
    id,
    {
      orderStatus: "cancelled",
    },
    { new: true }
  );

  return res.status(200).json({
    message: "Order cancelled successfully.",
    data: updateorderStatus,
  });
};

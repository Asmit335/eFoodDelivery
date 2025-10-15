const axios = require("axios");
const OrderM = require("../../model/orderModel");
const User = require("../../model/userModel");
exports.khaltiPayment = async (req, res) => {
  const { orderId, amount } = req.body;

  if (!orderId || !amount) {
    return res.status(400).json({
      message: "Please provide orderID and Amount",
    });
  }

  const orderdetail = await OrderM.findById(orderId);
  if (!orderdetail) {
    return res.status(404).json({
      message: "Order not found with the id.",
    });
  }

  if (orderdetail.totalAmount !== amount) {
    return res.status(404).json({
      message: "Amount must be equal to totalAmount.",
    });
  }

  const data = {
    return_url: "http://localhost:3000/payment/success",
    purchase_order_id: orderId,
    amount: amount * 100, //calculate in paisa such as if you enter 1000 in paisa == Rs10
    website_url: "http://localhost:3000",
    purchase_order_name: "orderName" + orderId,
  };
  const response = await axios.post(
    "https://dev.khalti.com/api/v2/epayment/initiate/",
    data,
    {
      headers: {
        Authorization: `Key ${process.env.khalti_secret_key}`,
      },
    }
  );

  const orderstat = await OrderM.findById(orderId);
  orderstat.paymentStatus.pidx = response.data.pidx;
  await orderstat.save();

  res.status(200).json({
    message: "Payment initiated Successfully.",
    payment_url: response.data.payment_url,
  });
  console.log(response.data);
};

exports.VerifyPidx = async (req, res) => {
  const userId = req.user.id;
  const pidx = req.query.pidx;
  const response = await axios.post(
    "https://dev.khalti.com/api/v2/epayment/lookup/",
    { pidx },
    {
      headers: {
        Authorization: `Key ${process.env.khalti_secret_key}`,
      },
    }
  );

  if (response.data.status === "Completed") {
    //database modification
    const orders = await OrderM.find({ "paymentStatus.pidx": pidx });
    orders[0].paymentStatus.method = "Khalti";
    orders[0].paymentStatus.status = "paid";
    await orders[0].save();
    const user = await User.findById(userId);
    user.cart = [];
    await user.save();
    res.redirect("http://localhost:3000");
    // res.redirect("https://www.asmitkhanal.com.np");
  }

  res.status(200).json({
    message: "Payment Verifed Successfully.",
    data: response.data,
  });
};

const ProductM = require("../../../model/productModel");
const User = require("../../../model/userModel");

exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please enter product ID.",
    });
  }
  const productExist = await ProductM.findById(id);
  if (!productExist) {
    return res.status(400).json({
      message: "Product with the given ID is unavailable.",
    });
  }
  const user = await User.findById(userId);
  user.cart.push(id);
  await user.save();
  res.status(200).json({
    message: "Product added to Cart Successfully.",
  });
};

exports.getMyCartItem = async (req, res) => {
  const userId = req.user.id;
  const userData = await User.findById(userId).populate({
    path: "cart",
    select: "-productStatus -createdAt",
  });
  res.status(200).json({
    message: "Product fetched Successfully.",
    data: userData.cart,
  });
};

exports.deleteMyCartItem = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Please provide cart product ID",
    });
  }
  //   const cartId = await User.findById(id);
  //   if (!cartId) {
  //     return res.status(400).json({
  //       message: "Given cart product ID not found",
  //     });
  //   }
  const user = await User.findById(userId);
  user.cart = user.cart.filter((pId) => pId != id);
  await user.save();
  res.status(200).json({
    message: "Cart Product removed Successfully.",
  });
};

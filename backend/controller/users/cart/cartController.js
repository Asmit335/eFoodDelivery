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

  const existingCartItem = user.cart.find((item) => item.product.equals(id));
  if (existingCartItem) {
    existingCartItem.quantity += 1;
  } else {
    user.cart.push({
      product: id,
      quantity: 1,
    });
  }
  await user.save();

  const userUpadatedCart = await User.findById(userId).populate("cart.product");
  res.status(200).json({
    message: "Product added to Cart Successfully.",
    data: userUpadatedCart.cart,
  });
};

exports.getMyCartItem = async (req, res) => {
  const userId = req.user.id;
  const userData = await User.findById(userId).populate({
    path: "cart.product",
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
  const product = await ProductM.findById(id);
  if (!product) {
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
  user.cart = user.cart.filter((item) => !item.product.equals(id));
  await user.save();
  res.status(200).json({
    message: "Cart Product removed Successfully.",
  });
};

exports.updateCartsItem = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { quantity } = req.body;

  const user = await User.findById(userId);
  const cartItem = user.cart.find((item) => item.product.equals(id));
  if (!cartItem) {
    return res.status(404).json({
      message: "No item with that Id.",
    });
  }
  cartItem.quantity = quantity;
  await user.save();
  return res.status(200).json({
    message: "Cart quantity updated Successfully.",
    data: user.cart,
  });
};

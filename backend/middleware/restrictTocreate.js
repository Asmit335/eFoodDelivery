const restricTocreateProduct = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    console.log(userRole);
    console.log(roles);

    if (!roles.includes(userRole)) {
      res.status(400).json({
        messagae: "You dont have permission",
      });
    } else {
      next();
    }
  };
};
module.exports = restricTocreateProduct;

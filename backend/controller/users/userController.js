const UserM = require("../../model/userModel");

exports.getUsers = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const users = await UserM.find({ _id: { $ne: userId } }).select("+password");
  if (users.length > 1) {
    res.status(200).json({
      message: "Users fetched Successfully.",
      data: users,
    });
  } else {
    res.status(404).json({
      message: "Users collection is empty.",
      data: [],
    });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({
      message: "Please provide userID.",
    });
  }

  const user = await UserM.findById(userId);
  if (!user) {
    res.status(404).json({
      message: "User not found with that ID.",
    });
  } else {
    await UserM.findByIdAndDelete(userId);
    res.status(200).json({
      message: "User deleted Successfully.",
    });
  }
};

const UserM = require("../../model/userModel");

exports.getUsers = async (req, res) => {
  const users = await UserM.find().select("+password");
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

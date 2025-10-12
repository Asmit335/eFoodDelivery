const User = require("../../../model/userModel");
const bcrypt = require("bcryptjs");
//get profile
exports.getMyProfile = async (req, res) => {
  const userId = req.user.userId;
  const myProfile = await User.findById(userId);
  res.status(200).json({
    messsage: "Profile fetched Successfully.",
    data: myProfile,
  });
};

//update profile
exports.updateMyProfile = async (req, res) => {
  const { email, phoneNumber, userName } = req.body;
  const userId = req.user.id;
  const updatedProfile = await User.findByIdAndUpdate(
    userId,
    {
      email,
      phoneNumber,
      userName,
    },
    {
      runValidators: true,
      new: true,
    }
  );
  res.status(200).json({
    message: "Profile Updated Successfully.",
    data: updatedProfile,
  });
};

//delete profile
exports.deleteMyProfile = async (req, res) => {
  const userId = req.user.id;
  await User.findByIdAndDelete(userId);
  res.status(200).json({
    message: "Profile Deleted Successfully.",
    data: null,
  });
};

//update profile password
exports.passwordUpdate = async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      message: "Please fill all the details.",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      message: "Both passwords must by same.",
    });
  }

  //taking our hash of old password
  const userData = await User.findById(userId);
  const hasholdPassword = userData.password;

  const isOldPasswordCorrect = bcrypt.compareSync(oldPassword, hasholdPassword);
  if (!isOldPasswordCorrect) {
    return res.status(400).json({
      message: "old Password didnt match",
    });
  }

  //if both password matched
  userData.password = bcrypt.hashSync(newPassword, 12);
  await userData.save();
  res.status(200).json({
    message: "Password updated Successfully.",
  });
};

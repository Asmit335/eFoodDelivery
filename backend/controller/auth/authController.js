const User = require("../../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../services/sendEmail");

exports.registerUser = async (req, res) => {
  const { email, password, phoneNumber, userName } = req.body;
  if (!email || !password || !phoneNumber || !userName) {
    res.status(400).json({
      message: "Please fill all the details.",
    });
  }

  const userEmailFound = await User.find({ email });
  if (userEmailFound.length > 0) {
    res.status(400).json({
      message: "User email already existed. Please fill new email.",
    });
  }

  await User.create({
    email,
    password: bcrypt.hashSync(password, 10),
    userName,
    phoneNumber,
  });
  res.status(200).json({
    message: "User is created.",
  });
};

//login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please fill all the details.",
    });
  }

  //email check
  const user = await User.find({ email });

  if (user.length === 0) {
    return res.status(400).json({
      message: "Email is not registered.",
    });
  }

  //password check
  const isPasswordCorrect = bcrypt.compareSync(password, user[0].password);

  if (isPasswordCorrect) {
    //generate token
    const token = jwt.sign({ id: user[0]._id }, process.env.JWTtoken, {
      expiresIn: "1d",
    });
    res.status(200).json({
      message: "User LoginedIn Successfully",
      token: token,
    });
  } else {
    res.status(400).json({
      message: "Invalid Password",
    });
  }
};

//forget Password api
exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Please enter the Email.",
    });
  }
  const checkUserEmailExit = await User.find({ email });
  if (checkUserEmailExit.length === 0) {
    return res.status(400).json({
      message: "Please enter the registered Email.",
    });
  }
  //send otp to email
  const otp = Math.floor(1000 + Math.random() * 9000);
  checkUserEmailExit[0].otp = otp;
  await checkUserEmailExit[0].save();

  await sendEmail({
    email: email,
    subject: "Reset YOur Password",
    message: `Your Otp is ${otp}`,
  });
  res.json({
    message: `Email is sent successfully and Otp is ${otp}`,
  });
};

//verify OTP
exports.verifyOpt = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({
      message: "Please Enter email and otp",
    });
  }
  const userExitEmail = await User.find({ email });
  if (userExitEmail.length === 0) {
    return res.status(400).json({
      message: "Email is not registered.",
    });
  }
  if (userExitEmail[0].otp !== otp) {
    res.status(400).json({
      message: "Please Enter correct OTP.",
    });
  } else {
    //dispose otp
    userExitEmail[0].otp = undefined;
    await userExitEmail[0].save();
    res.status(200).json({
      message: "OTP is correct.",
    });
  }
};

//resetPassword
exports.resetPassword = async (req, res) => {
  const { email, newPassword, confirmPass } = req.body;
  if (!email || !newPassword || !confirmPass) {
    return res.status(400).json({
      message: "Please fill all field.",
    });
  }
  if (newPassword !== confirmPass) {
    return res.status(400).json({
      message: "newpassword and confirmPassword donot matched.",
    });
  }
  const userExitEmail = await User.find({ email });
  if (userExitEmail.length === 0) {
    return res.status(400).json({
      message: "Email is not registered.",
    });
  }

  userExitEmail[0].password = bcrypt.hashSync(newPassword, 10);
  await userExitEmail[0].save();
  res.status(200).json({
    message: "Password Changed Successfully.",
  });
};

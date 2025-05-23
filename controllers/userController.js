const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.userId }, { _id: 0 });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User get success",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error in Get User API",
      error: error.message,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.userId });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    const { userName, address, phone, profile } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    if (profile) user.profile = profile;

    await user.save();
    res
      .status(200)
      .send({ success: true, message: "User Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error in Update User API",
      error: error.message,
    });
  }
};

// RESET PASSWORd
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found or Invalid Answer" });
    }
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res
      .status(200)
      .send({ success: false, message: "Reset Password Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succces: false,
      message: "Error When Reset Password",
      error: error.message,
    });
  }
};

const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Delete Profile API",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  resetPasswordController,
  deleteProfileController,
};

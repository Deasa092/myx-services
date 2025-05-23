const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: [true, "user name is required"],
    },
    email: {
      type: String,
      require: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "password is reqiured"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      require: [true, "phone is required"],
      unique: true,
    },
    role: {
      type: String,
      require: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "owner "],
    },
    profile: {
      type: String,
      default:
        "https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg",
    },
    answer: {
      type: String,
      required: [true, "Asnwer is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, requried: true },
    fistname: { type: String, requried: true },
    lastname: { type: String, requried: true },
    phone_number: { type: String, requried: true },
    email: { type: String, requried: true },
    location: { type: String, requried: true },
    profileImage: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg",
    },
    password: { type: String },
    deactivated: { type: Boolean, default: false },
    accountDeleted: { type: String, default: false },
    privateAccount: { type: Boolean, default: false },
    itemCount: { type: Number, default: 0 },
    soldItemCount: { type: Number, default: 0 },
    subscribed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;

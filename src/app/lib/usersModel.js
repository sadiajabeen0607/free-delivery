import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userModel = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    city: String,
    full_address: String,
    contact: String,
  },
  {
    timestamps: true,
  }
);

userModel.pre("save", async function (next) {
  if(!this.isModified("password")) {
    return next();
  };

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    next(error);
  }
})

export const User = mongoose.models.User || mongoose.model("User", userModel);

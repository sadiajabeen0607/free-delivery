// restaurantModel.js file

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const restaurantModel = new mongoose.Schema(
  {
    email: String,
    password: String,
    restaurant_name: String,
    city: String,
    full_address: String,
    contact: String,
  },
  {
    timestamps: true,
  }
);

restaurantModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    next(error);
  }
});

export const Restaurant =
  mongoose.models.restaurants || mongoose.model("restaurants", restaurantModel);

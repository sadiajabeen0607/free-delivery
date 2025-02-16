import mongoose from "mongoose";
import bcrypt from "bcrypt";


const deliveryPartnerModel = new mongoose.Schema(
  {
    username: String,
    mobile: String,
    password: String,
    city: String,
    full_address: String,
  },
  {
    timestamps: true,
  }
);

deliveryPartnerModel.pre("save", async function (next) {
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

export const DeliveryPartner = mongoose.models.DeliveryPartners || mongoose.model("DeliveryPartners", deliveryPartnerModel);

import mongoose from "mongoose";

const ordersModel = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  foodItemsIds: String,
  restaurant_id: mongoose.Schema.Types.ObjectId,
  deliveryBoy_id: mongoose.Schema.Types.ObjectId,
  status: String,
  amount: String
}, {
  timestamps: true
});

export const Orders = mongoose.models.orders || mongoose.model("orders", ordersModel);
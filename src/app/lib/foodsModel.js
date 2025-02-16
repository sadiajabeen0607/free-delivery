const { default: mongoose } = require("mongoose");

const foodMedel = new mongoose.Schema({
  food_name: String,
  food_price: Number,
  food_image: String,
  food_description: String,
  restaurant_id: mongoose.Schema.Types.ObjectId
}, {
  timestamps: true
});

export const Foods = mongoose.models.foods || mongoose.model("foods", foodMedel);
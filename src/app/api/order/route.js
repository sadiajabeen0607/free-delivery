import { connectDB } from "@/app/lib/db";
import { Orders } from "@/app/lib/ordersModel";
import { Restaurant } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const payload = await request.json();

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectDB);
    }

    const order = await Orders(payload);

    const result = await order.save();

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export async function GET(request) {
  try {
    const userId = request.nextUrl.searchParams.get("id");
    // console.log("user", userId);
    
    if(mongoose.connection.readyState === 0) {
      await mongoose.connect(connectDB);
    };

    let result = await Orders.find({user_id: userId});
    if(result) {
      let restaurantData = await Promise.all(
        result.map(async(item) => {
          let restaurantInfo = {};
          restaurantInfo.data = await Restaurant.findOne({_id: item.restaurant_id});
          restaurantInfo.amount = item.amount;
          restaurantInfo.status = item.status;
          return restaurantInfo;
        })
      );
      result = restaurantData;
    }

    return NextResponse.json({
      success: true,
      result: result
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      result: false,
      message: error.message || "Something went wrong"
    })
  }
}

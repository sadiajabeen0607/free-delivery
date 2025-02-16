import { connectDB } from "@/app/lib/db";
import { Orders } from "@/app/lib/ordersModel";
import { Restaurant } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
  try {
    const id = params.id;
    // console.log("Delivery Boy Id", id);
    
    if(mongoose.connection.readyState === 0) {
      await mongoose.connect(connectDB);
    };

    let result = await Orders.find({deliveryBoy_id: id});
    if(result) {
      let restaurantData = await Promise.all(
        result.map(async(item) => {
          console.log("item", item);
          
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
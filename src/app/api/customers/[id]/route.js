import { connectDB } from "@/app/lib/db";
import { Foods } from "@/app/lib/foodsModel";
import { Restaurant } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
  
  try {
    const id = params.id;
    if(mongoose.connection.readyState === 0) {
      await mongoose.connect(connectDB);
    }

    const resDetail = await Restaurant.findOne({_id: id});
    const foodItems = await Foods.find({restaurant_id: id});

    return NextResponse.json({
      success: true,
      resDetail,
      foodItems
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message || "Something went wrong"
    })
  }
}
import { connectDB } from "@/app/lib/db";
import { Restaurant } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    if(mongoose.connection.readyState === 0) {
      await mongoose.connect(connectDB);
    }

    let queryParams = request.nextUrl.searchParams;
    let filter = {};

    if(queryParams.get("location")) {
      let city = queryParams.get("location");
      filter = {city: {$regex: new RegExp(city, "i")}};
    } else if(queryParams.get("restaurant")) {
      let restaurant_name = queryParams.get("restaurant");
      filter = {restaurant_name: {$regex: new RegExp(restaurant_name, "i")}};
    };

    const result = await Restaurant.find(filter);

    return NextResponse.json({
      success: true,
      result
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message || "Something went wrong"
    })
  }
}
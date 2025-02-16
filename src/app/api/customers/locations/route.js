import { connectDB } from "@/app/lib/db";
import { Restaurant } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectDB);
    }

    let data = await Restaurant.find();

    let result = data
      .map((item) => item.city)
      .filter((city) => city && typeof city === "string")
      .map((city) => city.charAt(0).toUpperCase() + city.slice(1));

    result = [...new Set(result)];

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json({
      succuss: false,
      message: error.message || "Something went wrong",
    });
  }
}

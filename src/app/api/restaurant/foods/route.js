import { connectDB } from "@/app/lib/db";
import { Foods } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {

  try {
    const payload = await request.json();
    // console.log("payload", payload);
    

  await mongoose.connect(connectDB);

  const food = new Foods(payload);
  const result = await food.save();
  // console.log("result", result);
  

  return NextResponse.json({result, success: true})
  } catch (error) {
    return NextResponse.json({
      result: false,
      message: error.message,
      success: false
    })
  }
  
}
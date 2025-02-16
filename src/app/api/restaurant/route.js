// route.js file

import { connectDB } from "@/app/lib/db";
import { Restaurant } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function GET() {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(connectDB);
    }

    const data = await Restaurant.find();
    console.log("data", data);
    return NextResponse.json({ result: true, data });
  } catch (error) {
    console.log("Error Fetching Data", error);
    return NextResponse.json({ result: false, error: error.message });
  }
}

export async function POST(request) {
  try {
    let payload = await request.json();
    // console.log("payload", payload.data);

    await mongoose.connect(connectDB);
    let result;

    if(payload.login) {
      const restaurant = await Restaurant.findOne({email: payload.data.email});

      if(!restaurant) {
        return NextResponse.json({
          result: false,
          message: "Invalid Credential",
          success: false
        })
      }

      // console.log("restaurant", restaurant);
      
      const isPasswordValid = await bcrypt.compare(payload.data.password, restaurant.password);
      if(!isPasswordValid) {
        return NextResponse.json({
          result: false,
          message: "Invalid Credential",
          success: false
        })
      }

      const {password, ...rest} = restaurant._doc;
      result = { ...rest };
    } else {
      result = new Restaurant(payload);
      await result.save();
    }

    return NextResponse.json({ result, success: true });
  } catch (error) {
    return NextResponse.json({
      result: false,
      message: error.message,
      success: false,
    });
  }
}

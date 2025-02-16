import { connectDB } from "@/app/lib/db";
import { DeliveryPartner } from "@/app/lib/deliveryPartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params}) {
  try {
    const city = params.city;
    // console.log("city", city);

    if(mongoose.connection.readyState === 0) {
      await mongoose.connect(connectDB);
    }

    const filter = {city: {$regex: new RegExp(city, "i")}};
    const result = await DeliveryPartner.find(filter);

    return NextResponse.json({
      success: true,
      result: result
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message || "Something went wrong"
    })
  }
}
import { connectDB } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { DeliveryPartner } from "@/app/lib/deliveryPartnersModel";

export async function POST(request) {
  try {
    let payload = await request.json();
    if(mongoose.connection.readyState === 0) {
      await mongoose.connect(connectDB);
    };

    // console.log("payload", payload);
    
    let result;
    if(payload.login) {
      const deliveryPartner = await DeliveryPartner.findOne({mobile: payload.mobile});
      // console.log("user", user);
      

      if(!deliveryPartner) {
        return NextResponse.json({
          success: false,
          result: false,
          message: "Invalid Credential"
        });
      }

      const isPasswordValid = await bcrypt.compare(payload.password, deliveryPartner.password);

      if(!isPasswordValid) {
        return NextResponse.json({
          success: false,
          result: false,
          message: "Invalid Credential"
        });
      }

      return NextResponse.json({
        success: true,
        message: "Login Successfully",
        result: deliveryPartner
      })

    }else {
      result = await DeliveryPartner(payload);
      await result.save();

      return NextResponse.json({
        success: true,
        result
      })
    }

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message || "Registration Failed",
      result: false
    })
  }
}
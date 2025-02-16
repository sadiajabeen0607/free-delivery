import { connectDB } from "@/app/lib/db";
import { User } from "@/app/lib/usersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    let payload = await request.json();
    if(mongoose.connection.readyState === 0) {
      await mongoose.connect(connectDB);
    };

    // console.log("payload", payload);
    
    let result;
    if(payload.login) {
      const user = await User.findOne({email: payload.email});
      // console.log("user", user);
      

      if(!user) {
        return NextResponse.json({
          success: false,
          result: false,
          message: "Invalid Credential email"
        });
      }

      const isPasswordValid = await bcrypt.compare(payload.password, user.password);

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
        result: user
      })

    }else {
      result = await User(payload);
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
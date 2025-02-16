import { connectDB } from "@/app/lib/db";
import { Foods } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  const params = await content.params;

  const id = params?.id

  // console.log("id", id);
  

  if (!id) {
    return NextResponse.json({
      success: false,
      message: "Invalid or missing 'id'.",
    });
  }

  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(connectDB);
    }

    const result = await Foods.findOne({ _id: id });

    return NextResponse.json({
      result,
      success: true,
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
}

export async function PUT(request, content) {
  const params = await content.params;

  const id = params?.id

  if(!id) {
    return NextResponse.json({
      success: false,
      message: "Missing or Invalid 'id"
    });
  };

  try {
    if(mongoose.connection.readyState) {
      await mongoose.connect(connectDB);
    };

    const data = await request.json();
    // console.log("data", data)

    const updatedFood = await Foods.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    if(!updatedFood) {
      return NextResponse.json({
        success: false,
        message: "Food item not found"
      });
    };

    return NextResponse.json({
      success: true,
      message: "Updated Food Item"
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    })
  }
}


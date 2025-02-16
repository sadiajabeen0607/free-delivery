import { connectDB } from "@/app/lib/db";
import { Foods } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {

  const id =  params.id;

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

    const result = await Foods.find({ restaurant_id: id });

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

export async function DELETE(request, content) {
  const params = await content.params;
  const id = params?.id;

  if(!id) {
    return NextResponse.json({
      success: false,
      message: "Invalid or missing 'id"
    });
  }

  try {
    if(!mongoose.connection.readyState) {
      await mongoose.connect(connectDB);
    }

    const result = await Foods.deleteOne({_id: id});

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




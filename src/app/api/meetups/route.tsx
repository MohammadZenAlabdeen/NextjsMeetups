import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Meetup from "../../../../models/Meetup";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const meetups = await Meetup.find({});
    mongoose.connection.close();
    if (meetups.length === 0) {
      return NextResponse.json(
        { message: "there are no meetups currently" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "meetups fetched successfully", data: meetups },
      { status: 200 }
    );
  } catch (error: unknown) {
    mongoose.connection.close();
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "there was an error: " + error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "there was an unkown error" },
        { status: 500 }
      );
    }
  }
}

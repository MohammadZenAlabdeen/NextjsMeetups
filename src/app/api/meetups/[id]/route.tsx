import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Meetup from "../../../../../models/Meetup";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
) {    
  try {
    await connectMongoDB();
    const { pathname } = req.nextUrl;
    const segments = pathname.split('/');
    const id = segments[segments.length - 1];
    const newid = new mongoose.Types.ObjectId(id);
    const meetup = await Meetup.findById(newid);
    mongoose.connection.close();

    if (!meetup) {
      return NextResponse.json(
        { message: "This Meetup doesn't exist" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "meetup fetched successfully", data: meetup },
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
        { message: "there was an unknown error" },
        { status: 500 }
      );
    }
  }
}

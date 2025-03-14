import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Meetup from "../../../../../models/Meetup";
import connectMongoDB from "../../../../../libs/mongodb";
import { File } from "node:buffer";
import { CreateSchema } from "../../../../../libs/validation";
import { pinata } from "@/utils/config";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const data = await req.formData();
    const title = data.get("title") as string;
    const location = data.get("location") as string;
    const description = data.get("description") as string;
    const img = data.get("img") as unknown as File;
    CreateSchema.parse({ title, location, description, img });
    const { cid } = await pinata.upload.public.file(img);
    const url = await pinata.gateways.public.convert(cid);
    await Meetup.create({
      title: title,
      location: location,
      description: description,
      img_url: url,
    });
    mongoose.connection.close();

    return NextResponse.json(
      {
        message: "Meetup created successfully",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    mongoose.connection.close();

    if (error instanceof Error) {
      return NextResponse.json(
        { message: "There was an error: " + error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "There was an unknown error" },
        { status: 500 }
      );
    }
  }
}

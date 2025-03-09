import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Meetup from "../../../../../models/Meetup";
import connectMongoDB from "../../../../../libs/mongodb";
import { File } from "node:buffer";
import { CreateSchema } from "../../../../../libs/validation";
import { extname, join } from "node:path";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const data = await req.formData();
    const title = data.get("title") as string;
    const location = data.get("location") as string;
    const description = data.get("description") as string;
    const img = data.get("img") as unknown as File;
    CreateSchema.parse({ title, location, description, img });
    const uploadDir = join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const bytes = await img.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExtension = extname(img.name);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `post_${timestamp}_${Math.random()
      .toString(36)
      .substring(2, 8)}${fileExtension}`;
    const filePath = join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);
    const url = `/uploads/${fileName}`;

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

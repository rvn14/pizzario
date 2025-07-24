/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectToDb } from "@/lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  await connectToDb();

  // Use Next.js cookies helper
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "No token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}

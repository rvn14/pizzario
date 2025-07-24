/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectToDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
    await connectToDb();

    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    if (!token) {
        return NextResponse.json(
            { success: false, message: "Not Authenticated" },
            { status: 401 }
        );
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
            
        }

    } catch (error) {
        console.error("Error decoding token:", error);
        return NextResponse.json(
            { success: false, message: "Invalid Token" },
            { status: 401 }
        );
        
    }

}

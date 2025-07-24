/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDb } from "@/lib/mongodb";
import User from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "7d";

export async function POST(req: NextRequest) {
  //connec to the database
  await connectToDb();

   // Start a MongoDB session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    // Parse JSON body
    const {name, email, password} = await req.json();

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email }).session(session);

    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { success: false, message: "User already exists." },
        { status: 409 }
      );
    }
    
    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the user inside the transaction
    const createdUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );
    const newUser = createdUsers[0];

    // 4. Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION } as SignOptions
    );

    // 5. Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // 6. Return user data (without password) + token
    const userSafe = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
    const response = NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: { user: userSafe },
      },
      { status: 201 }
    );
    response.headers.set(
      'Set-Cookie',
      `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`
    );
    return response;

  } catch (error: any) {
    console.error("Error during signup:", error);
    await session.abortTransaction();
    session.endSession();

    return NextResponse.json(
      {
        success: false,
        message: error.message || "An error occurred during signup.",
      },
      { status: error.statusCode || 500 }
    );
  }

}
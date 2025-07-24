import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { connectToDb } from "@/lib/mongodb";
import User from "@/models/User";


const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1d";

export async function POST(req: NextRequest){

  await connectToDb();

  try {
    // Parse JSON body
  const { email, password } = await req.json();

  // 1. Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials." },
      { status: 401 }
    );
  }

  // 2. Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials." },
      { status: 401 }
    );
  }

  // 3. Generate JWT token
  const token = jwt.sign(
    { userId: user._id },
    JWT_SECRET as string,
    { expiresIn: JWT_EXPIRATION } as SignOptions
  );

  // 4. Return user data (without password) + token
  const userSafe = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
  const response = NextResponse.json(
    { success: true, user: userSafe },
    { status: 200 }
  );
  response.headers.set(
    'Set-Cookie',
    `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`
  );
  return response;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return NextResponse.json(
      { success: false, message: "Database connection failed." },
      { status: 500 }
    );
    
  }


}
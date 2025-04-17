// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Define your expected payload shape
interface JwtPayload {
  userId: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  try {
    // Verify & decode! Throws if invalid/expired
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    return NextResponse.json({
      authenticated: true,
      user: {
        id: payload.userId,
        email: payload.email,
        name: payload.name,
        isAdmin: payload.isAdmin,
      },
    });
  } catch (err) {
    console.error('JWT verify failed:', err);
    return NextResponse.json({ authenticated: false });
  }
}

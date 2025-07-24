/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(request: Request){

    // Remove the token cookie by setting it to expire in the past
    const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
    response.headers.set(
      'Set-Cookie',
      'token=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
    );
    return response;

}
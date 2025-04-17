/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(request: Request){

    const cookieStore = await cookies();
    cookieStore.delete('token');
    
    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });

}
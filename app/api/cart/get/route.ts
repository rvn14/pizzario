import { connectToDb } from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest } from "next/server";


export async function GET(res: NextRequest) {

    await connectToDb();
    const user = res.cookies.get("user");
    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userId = user.value;
    // Fetch user's cart from the database
    try {
        const cart = await User.findById(userId).select("cart").lean();
    if (!cart) {
        return new Response("Cart not found", { status: 404 });
    }
    return new Response(JSON.stringify(cart), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
    } catch (error) {
        console.error("Error fetching cart:", error);
        return new Response("Internal Server Error", { status: 500 });
        
    }

    // getting authenticated user's cart from the database


}
    
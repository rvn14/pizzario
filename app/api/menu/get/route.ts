import { connectToDB } from "@/lib/mongodb";

export async function GET() {
    
    const { db } = await connectToDB();

    const pizzas = await db.collection("pizzas").find({}).toArray();
    const desserts = await db.collection("desserts").find({}).toArray();
    const beverages = await db.collection("beverages").find({}).toArray();

    console.log("Fetched pizzas: ", pizzas);
    console.log("Fetched desserts: ", desserts);
    console.log("Fetched beverages: ", beverages);
    return new Response(JSON.stringify({ pizzas, desserts, beverages }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
    


}
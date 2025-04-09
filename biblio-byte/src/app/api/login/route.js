
import User from "../../../models/User.js";
import connectMongoDB from "../../../../config/mongodb.ts";


export async function POST(req) {
    const { email, password } = await req.json();

    await connectMongoDB();

    const user = await User.findOne({ email });

    
    if (!user) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), {
            status: 401,
        });
    }  
    
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), {
            status: 401,
        });
    }

    return new Response(JSON.stringify({message: "Login successful"}), {
        status: 200,
    });
}
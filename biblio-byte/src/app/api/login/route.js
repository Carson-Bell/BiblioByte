
import User from "../../../models/User.js";
import connectMongoDB from "../../../../config/mongodb.ts";
import jwt from "jsonwebtoken";


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

    //Generating JWT token
    const token = jwt.sign(
        { id: user._id, email: user.email }, 
        process.env.JWT_SECRET,
         { expiresIn: '1h' } // expires in 1 hour
    );

    return new Response(JSON.stringify({message: "Login successful"}), {
        status: 200,
        headers: {
            'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=3600;`, // 1 hour
            'Content-type': 'application/json',
        }
    });
}
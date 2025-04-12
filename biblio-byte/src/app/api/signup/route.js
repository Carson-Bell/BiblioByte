import User from "../../../models/User.js";
import connectMongoDB from "../../../../config/mongodb.ts";

export async function POST(req) {
    const { name, email, password, university } = await req.json();

    await connectMongoDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return new Response(JSON.stringify({ error: "User already exists" }), {
            status: 409,
        });
    }

    const newUser = new User({ name, email, password, university });
    await newUser.save();

    return new Response(JSON.stringify({ message: "User created successfully" }), {
        status: 201,
    });
}


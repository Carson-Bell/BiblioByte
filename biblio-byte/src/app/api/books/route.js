import Book from "../../../models/Book.js";
import connectMongoDB from "../../../../config/mongodb.ts";

export async function POST(req) {
    const {  } = await req.json();

    await connectMongoDB();
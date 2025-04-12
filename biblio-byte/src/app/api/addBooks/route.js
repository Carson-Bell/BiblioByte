import Book from "../../../models/Book.js";
import connectMongoDB from "../../../../config/mongodb.ts";

export async function POST(req) { //Used for the search bar on the home page
    const { title, author, className, school } = await req.json();

    await connectMongoDB();
    
        const existingBook = await Book.findOne({ title, author, className, school });
        if (existingBook) {
            return new Response(JSON.stringify({ error: "Book already exists" }), {
                status: 409,
            });
        }
        const newBook = new Book({ title, author, className, school });
        await newBook.save();
        return new Response(JSON.stringify({ message: "Book created successfully" }), {
            status: 201,
        });
    }
    




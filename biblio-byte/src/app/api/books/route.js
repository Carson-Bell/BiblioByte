import Book from "../../../models/Book.js";
import connectMongoDB from "../../../../config/mongodb.ts";

export async function GET(req) {
    await connectMongoDB();

    try {
        const { searchParams } = new URL(req.url);
        const searchTerm = searchParams.get('searchTerm');

        let books;

        if (!searchTerm) { // if no search term
            books = await Book.find();
        } else {
            books = await Book.find({
                title: { $regex: searchTerm, $options: 'i' },
            });
        }

        return new Response(JSON.stringify(books), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch books' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(req) { //Used for the search bar on the home page
    const { searchType, searchTerm } = await req.json();

    await connectMongoDB();

    try {
        // Construct the query based on searchType
        const query = {};
        if (searchType === 'Textbook') {
            query.title = { $regex: searchTerm, $options: 'i' }; // Case-insensitive search
        } else if (searchType === 'Class') {
            query.className = { $regex: searchTerm, $options: 'i' };
        } else if (searchType === 'School') {
            query.school = { $regex: searchTerm, $options: 'i' };
        }

        const existingBook = await Book.findOne({ title, author });
            if (existingBook) {
                return NextResponse.json(
                { message: 'A book with the same title and author already exists.' },
                { status: 400 }
            );
}

        // Perform the search
        const results = await Book.find(query);

        // Return the results
        return new Response(JSON.stringify(results), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error during search:', error);
        return new Response(JSON.stringify({ error: 'Search failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

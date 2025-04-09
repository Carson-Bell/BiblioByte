import Book from "../../../models/Book.js";
import connectMongoDB from "../../../../config/mongodb.ts";

export async function POST(req) {
    const { searchType, searchTerm } = await req.json();

    await connectMongoDB();

    try {
        // Construct the query based on searchType
        const query = {};
        if (searchType === 'Textbook') {
            query.title = { $regex: searchTerm, $options: 'i' }; // Case-insensitive search
        } else if (searchType === 'Class') {
            query.class = { $regex: searchTerm, $options: 'i' };
        } else if (searchType === 'School') {
            query.school = { $regex: searchTerm, $options: 'i' };
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

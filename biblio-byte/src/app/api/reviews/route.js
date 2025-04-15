import connectMongoDB from '../../../../config/mongodb';
import Book from '../../../models/Book';
import auth from '../../../middleware/auth';

export async function POST(req) {
    const { valid, error, decoded } = auth(req);
    if (!valid) {
        return new Response(JSON.stringify({ message: error }), { status: 401 });
    }

    const { bookId, name, description, rating } = await req.json();

    if (!bookId || !name || !description || !rating) {
        return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    try {
        await connectMongoDB();

        const book = await Book.findById(bookId);
        if (!book) {
            return new Response(JSON.stringify({ message: 'Book not found' }), { status: 404 });
        }

        const review = {
            name,
            rating,
            comment: description,
        };

        book.reviews.push(review);
        await book.save();

        return new Response(JSON.stringify({ message: 'Review added successfully' }), { status: 201 });
    } catch (error) {
        console.error('Error adding review:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
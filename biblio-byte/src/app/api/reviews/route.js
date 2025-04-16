import connectMongoDB from '../../../../config/mongodb';
import Book from '../../../models/Book';
import User from '../../../models/User'; // Import the User model
import auth from '../../../middleware/auth';

export async function POST(req) {
    const { valid, error, decoded } = auth(req);
    if (!valid) {
        return new Response(JSON.stringify({ message: error }), { status: 401 });
    }

    const { bookId, title, description, rating } = await req.json();

    console.log("Incoming data:", { bookId, title, description, rating }); // jen debug

    if (!bookId || !title || !description || !rating) {
        return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    try {
        await connectMongoDB();

        const user = await User.findById(decoded.id).lean();
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return new Response(JSON.stringify({ message: 'Book not found' }), { status: 404 });
        }

        const review = {
            name: user.name , // Use user's name or email if name is not available
            title: title,
            rating,
            comment: description
        };
        console.log("Review object:", review);


        book.reviews.push(review);
        await book.save();
        console.log("Review added successfully");


        return new Response(JSON.stringify({ message: 'Review added successfully' }), { status: 201 });
    } catch (error) {
        console.error('Error adding review:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
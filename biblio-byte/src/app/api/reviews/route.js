import connectMongoDB from '../../../../config/mongodb';
import Book from '../../../models/Book';
import User from '../../../models/User'; // Import the User model
import auth from '../../../middleware/auth';
import mongoose from 'mongoose';

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

        const alreadyReviewed = book.reviews.some(
            (review) => review.name.toLowerCase() === user.name.toLowerCase()
        );

        if (alreadyReviewed) {
            console.log('User already reviewed this book.');
            return new Response(JSON.stringify({ message: 'You have already reviewed this book' }), { status: 400 });
        }

        const newReview = {
            _id: new mongoose.Types.ObjectId(), // manually creating id this time
            name: user.name,
            title: title,
            rating: rating,
            comment: description,
        };

        book.reviews.push(newReview);
        await book.save();

        console.log("Review added successfully:", newReview);

        return new Response(JSON.stringify({
            id: newReview._id,
            title: newReview.title,
            content: newReview.comment,
            score: newReview.rating,
            user: newReview.name,
            school: user.university,
            bookId: book._id,
        }), { status: 201 });

    } catch (error) {
        console.error('Error adding review:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
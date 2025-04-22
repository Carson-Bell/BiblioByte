import connectMongoDB from '../../../../../../config/mongodb';
import Book from '../../../../../models/Book';
import User from '../../../../../models/User';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const { id } = params;

    await connectMongoDB();

    try {
        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const books = await Book.find({
            $or: [
                { 'reviews.name': user.name },
                { 'finds.name': user.name }
            ]
        }).lean();

        const userReviews = [];
        const userListings = [];

        for (const book of books) {
            if (book.reviews) {
                book.reviews.forEach(review => {
                    if (review.name === user.name) {
                        userReviews.push({
                            id: review._id,
                            score: review.rating,
                            title: review.title,
                            content: review.comment,
                            user: review.name,
                            school: user.university
                        });
                    }
                });
            }

            if (book.finds) {
                book.finds.forEach(find => {
                    if (find.name === user.name) {
                        userListings.push({
                            id: find._id,
                            title: find.file || find.url,
                            description: find.description,
                            bookId: book._id,
                        });
                    }
                });
            }
        }

        return NextResponse.json({ reviews: userReviews, listings: userListings });
    } catch (err) {
        console.error('Error fetching user reviews and listings:', err);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
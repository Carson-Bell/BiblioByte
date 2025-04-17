import connectMongoDB from '../../../../config/mongodb';
import Book from '../../../models/Book';
import BookPageClient from '../../../components/BookPageClient';

export default async function Page({ params }) {
    const { id } = await params;

    await connectMongoDB();
    const book = await Book.findById(id).lean();

    if (!book) {
        return <div>Book not found</div>;
    }

    // convert objectId to string so no error
    book._id = book._id.toString();
    
        // Convert each review's _id to string (if reviews exist)
        if (book.reviews) {
            book.reviews = book.reviews.map((review) => ({
                ...review,
                _id: review._id.toString(), // Convert _id to string
            }));
        }    

    return (
        <>
            <BookPageClient book={book} reviews={book.reviews || []} />
        </>

    );
}
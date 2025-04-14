import connectMongoDB from '../../../../config/mongodb';
import Book from '../../../models/Book';
import BookPageClient from '../../../components/BookPageClient';
import Review from '../../../components/ReviewWrapper';
import ReviewWrapper from '../../../components/ReviewWrapper';

export default async function Page({ params }) {
    const id = params.id;

    await connectMongoDB();
    const book = await Book.findById(id).lean();

    if (!book) {
        return <div>Book not found</div>;
    }

    // convert objectId to string so no error
    book._id = book._id.toString();

    return (
        <>
        <BookPageClient book={book} />
        <ReviewWrapper bookId={book._id} /> {/* Pass bookId */}

    </>
    );
}
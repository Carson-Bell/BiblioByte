import connectMongoDB from '../../../../../config/mongodb';
import User from '../../../../models/User';
import auth from '../../../../middleware/auth';
import Book from '../../../../models/Book';

export async function POST(req) {
    const { valid, decoded, error } = auth(req);
    if (!valid) {
        return new Response(JSON.stringify({ error }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { bookId } = await req.json();
    if (!bookId) {
        return new Response(JSON.stringify({ error: 'Missing bookId' }), {
            status: 400,
        });
    }

    try {
        await connectMongoDB();

        const user = await User.findById(decoded.id);

        // check existence
        const alreadyExists = user.watchlist.some(item =>
            item.book?.toString() === bookId
        );

        if (alreadyExists) {
            return new Response(JSON.stringify({ message: 'Book already in watchlist' }), { status: 409 });
        }

        // add book to array
        user.watchlist.push({ book: bookId });
        await user.save();

        return new Response(JSON.stringify({ message: 'Book added to watchlist' }), { status: 201 });

    } catch (err) {
        console.error('Error updating watchlist:', err);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}

export async function GET(req) {
    const { valid, decoded, error } = auth(req);
    if (!valid) {
        return new Response(JSON.stringify({ error }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    await connectMongoDB();

    const user = await User.findById(decoded.id).populate('watchlist.book');

    if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), {
            status: 404,
        });
    }

    const books = user.watchlist.map(entry => ({
        ...entry.book.toObject(),
        addedAt: entry.addedAt,
    }));

    return new Response(JSON.stringify({ books }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function DELETE(req) {
    const { valid, decoded, error } = auth(req);
    if (!valid) {
        return new Response(JSON.stringify({ error }), { status: 401 });
    }

    let parsed;
    try {
        parsed = await req.json();
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Missing or invalid JSON body' }), { status: 400 });
    }

    const bookId = parsed.bookId;

    if (!bookId) {
        return new Response(JSON.stringify({ error: 'Missing bookId' }), { status: 400 });
    }

    await connectMongoDB();

    const user = await User.findById(decoded.id);

    user.watchlist = user.watchlist.filter(entry => entry.book.toString() !== bookId);

    await user.save();

    return new Response(JSON.stringify({ message: 'Book removed from watchlist' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
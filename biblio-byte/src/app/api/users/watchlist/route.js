import connectMongoDB from '../../../../../config/mongodb';
import User from '../../../../models/User';
import auth from '../../../../middleware/auth';

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

        // Check if already in watchlist
        const alreadyExists = user.watchlist.some(item =>
            item.book.toString() === bookId
        );

        if (alreadyExists) {
            return new Response(JSON.stringify({ message: 'Book already in watchlist' }), { status: 409 });
        }

        // Add book
        user.watchlist.push({ book: bookId });
        await user.save();

        return new Response(JSON.stringify({ message: 'Book added to watchlist' }), { status: 200 });

    } catch (err) {
        console.error('Error updating watchlist:', err);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
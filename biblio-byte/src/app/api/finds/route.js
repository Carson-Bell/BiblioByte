import connectMongoDB from '../../../../config/mongodb';
import Book from '../../../models/Book';
import User from '../../../models/User'; // Import the User model
import auth from '../../../middleware/auth';

export async function POST(req) {
    const {valid, error, decoded} = auth(req);
    if (!valid) {
        return new Response(JSON.stringify({message: error}), {status: 401});
    }

    const {bookId, file, url, description} = await req.json();

    console.log("Incoming data:", {bookId, file, url}); // Debugging

    if (!bookId || (!file && !url)) {
        return new Response(JSON.stringify({message: 'Missing required fields'}), {status: 400});
    }

    try {
        await connectMongoDB();

        const user = await User.findById(decoded.id).lean();
        if (!user) {
            return new Response(JSON.stringify({message: 'User not found'}), {status: 404});
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return new Response(JSON.stringify({message: 'Book not found'}), {status: 404});
        }

        const find = {
            name: user.name, // Use user's name or email if name is not available
            file: file || null, // File path or URL
            url: url || null,  // URL if provided
            description: description || '',
        };
        console.log("Find object:", find);

        if (!book.finds) {
            book.finds = [];
        }
        book.finds.push(find);
        console.log("Book ID:", bookId);
        await book.save();
        console.log("Find added successfully");
        console.log("Book ID:", bookId);
        console.log("Decoded user ID:", decoded.id);
        console.log("User found:", user);
        console.log("Book found:", book);
        console.log("Find object to add:", find);

        return new Response(JSON.stringify(find), {status: 201});
    } catch (error) {
        console.error('Error adding find:', error);
        return new Response(JSON.stringify({message: 'Internal Server Error'}), {status: 500});
    }
}
import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../config/mongodb';
import Book from '../../../../models/Book';

export async function POST(req) {
    try {
        const { title, author, description: providedDescription, link } = await req.json();

        await connectMongoDB();

        // Check if a book with the same title and author already exists
        const existingBook = await Book.findOne({ title, author });
        if (existingBook) {
            return NextResponse.json(
                { message: 'A book with the same title and author already exists.' },
                { status: 400 }
            );
        }

        const googleRes = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`
        );
        const googleData = await googleRes.json();

        const bookInfo = googleData.items?.[0]?.volumeInfo || {};

        const thumbnail = bookInfo.imageLinks?.thumbnail || '';
        const description = providedDescription || bookInfo.description || 'No description available';

        const newBook = await Book.create({
            title,
            author,
            description,
            link,
            thumbnail,
        });

        return NextResponse.json({ message: 'Book added!', book: newBook }, { status: 201 });
    } catch (err) {
        console.error('Error adding book:', err);
        return NextResponse.json({ message: 'Failed to add book', error: err.message }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../config/mongodb';
import Book from '../../../../models/Book';

export async function POST(req) {
    try {
        const { title, author, description, link } = await req.json();

        await connectMongoDB();

        const googleRes = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`
        );
        const googleData = await googleRes.json();

        const thumbnail =
            googleData.items?.[0]?.volumeInfo?.imageLinks?.thumbnail || '';

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

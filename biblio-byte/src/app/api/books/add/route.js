import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../config/mongodb';
import Book from '../../../../models/Book';

export async function POST(req) {
    try {
        const { title, author, description, link, thumbnail } = await req.json();

        await connectMongoDB();

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

"use client";
import { useState } from 'react';

type Book = {
    id: number;
    title: string;
    author: string;
    description: string;
    link: string;
};

type BooksProps = {
    books: Book[];
};

function Books(props: BooksProps) {
    const { books } = props;
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="flex flex-col gap-4">
            {books.map((book) => (
                <Card key={book.id} title={book.title} author={book.author} description={book.description} link={book.link} />
            ))}
        </div>
    );
}

type CardProps = {
    title: string;
    author: string;
    description: string;
    link: string;
};

function Card({ title, author, description, link }: CardProps) {
    return (
        <div className="card">
            <h2>{title}</h2>
            <h3>{author}</h3>
            <p>{description}</p>
            <a href={link}>Read more</a>
        </div>
    );
}

export default Books;
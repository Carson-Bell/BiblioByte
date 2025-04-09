'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (!query) return;

        const fetchBooks = async () => {
            const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
            const data = await res.json();
            setBooks(data.items || []);
        };

        fetchBooks();
    }, [query]);

    return (
        <div style={{padding: '2rem'}}>
            <h1>Search Results for "{query}"</h1>
            <ul>
                {books.map((book) => {
                    const info = book.volumeInfo;
                    return (
                        <li key={book.id} style={{marginBottom: '1rem'}}>
                            <strong>{info.title}</strong><br/>
                            {info.authors?.join(', ')}<br/>
                            <img src={info.imageLinks?.thumbnail} alt={info.title}/>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
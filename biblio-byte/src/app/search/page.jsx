'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const BookCard = ({ title, author, description, link }) => (
  <Link href={`/search/${link}`} passHref>
    <div style={styles.card}>
      <h2>{title}</h2>
      <h4>by {author}</h4>
      <p>{description}</p>
    </div>
  </Link>
);

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
      <div style={styles.container}>
        <h1>Search Results for "{query}"</h1>
        <div style={styles.grid}>
          {books.map((book) => {
            const info = book.volumeInfo;
            return (
                <BookCard
                    key={book.id}
                    id={book.id}
                    title={info.title}
                    author={(info.authors || []).join(', ')}
                    description={info.description?.slice(0, 100) || 'No description available.'}
                />
            );
          })}
        </div>
      </div>
  )
}

const styles = {
  container: {
    padding: '20px',
    paddingTop: '100px',
    fontFamily: 'Arial, sans-serif',
    maxHeight: '100vh',
    overflowY: 'auto',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
};


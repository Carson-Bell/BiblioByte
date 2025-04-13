"use client";
import { useState, useEffect } from 'react';
import Books from '../../components/Books';
import Link from 'next/link';
import { Book } from '../../types/Book';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('term');
  const searchType = searchParams.get('type') || 'Textbook';
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchBooks =  async () => {
          if (!searchTerm) return;

          try {
              const res = await fetch('/api/books', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ searchType, searchTerm }),
              });

              const data = await res.json();
              setBooks(data);
          } catch (error) {
              console.error('Failed to fetch books:', error);
          } finally {
              setLoading(false);
          }
      };

      fetchBooks();
  }, [searchTerm, searchType]);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      ></div>
      <div
        className="flex flex-col items-center justify-center p-3"
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: '80px',
        }}
      >
        <h1 className="text-4xl font-bold text-white mb-6">Search Results:</h1>

          {loading ? (
              <p className="text-white">Loading...</p>
          ) : books.length > 0 ? (
              <Books prop={books} />
          ) : (
              <p className="text-white">No books found.</p>
          )}

        <Link href="/create-book">
          <button
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#022f2e',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Add a New Book
          </button>
        </Link>
      </div>
    </div>
  );
}
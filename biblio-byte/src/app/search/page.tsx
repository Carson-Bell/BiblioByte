"use client";
import { useState } from 'react';
import Books from '../../components/Books';
import Link from 'next/link';

type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  link: string;
};

export default function Home() {
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A novel set in the 1920s that explores themes of decadence and excess.',
      link: 'the-great-gatsby',
    },
  ]);

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
        <Books prop={books} />
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
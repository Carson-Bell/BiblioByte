'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Card from "../../../../components/Card.js";

function BookCard({ title, author, onDelete, book, bookId }) {
    return (
            <div style={innerCardStyle}>
                <div style={leftContentStyle}>
                    {book.thumbnail && (
                        <img
                            src={book.thumbnail}
                            alt={`Cover of ${book.title}`}
                            style={bookImageStyle}
                        />
                    )}
                    <div style={bookContentStyle}>
                        <Link href={`/search/${book._id}`} passHref>
                            <h2 style={titleStyle}>Title: {book.title}</h2>
                            <p style={authorStyle}>Author: {book.author}</p>
                        </Link>
                    </div>
                </div>
                <button
                    style={deleteButtonStyle}
                    onClick={() => onDelete(bookId)}
                >
                    X
                </button>
            </div>

    );
}



function Page() {
    const [savedBooks, setSavedBooks] = useState([]);

    const handleDelete = async (bookId) => {
        try {
            const res = await fetch('/api/users/watchlist', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookId }),
            });

            if (res.ok) {
                setSavedBooks(prev => prev.filter(book => book._id !== bookId));
            } else {
                console.error('Failed to delete book: ', await res.json());
            }
        } catch (err) {
            console.error('Error deleting book:', err);
        }
    };

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const res = await fetch('/api/users/watchlist');
                const data = await res.json();
                setSavedBooks(data.books || []);
            } catch (err) {
                console.error('Failed to fetch watchlist:', err);
            }
        };

        fetchWatchlist();
    }, []);

    return (
        <div style={pageStyle}>
            <div style={sectionStyle}>
                <h1 className="text-3xl font-bold text-white mb-2" align='center'>Saved Books</h1>
                {savedBooks.length === 0 ? (
                    <div className="mt-6 p-6 rounded-2xl border border-gray-600/20 text-center shadow-sm backdrop-blur-xl max-w-xl mx-auto bg-stone-800/30">
                        <p className="text-2xl text-gray-200 mb-2">No saved books</p>
                        <p className="text-md text-gray-400 italic font-light">Save some books and come back later!</p>
                    </div>
                ) : (
                    savedBooks.map(book => (
                        <BookCard
                            key={book._id}
                            bookId={book._id}
                            book={book}
                            title={book.title}
                            author={book.author}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );

}

const pageStyle = {
    height: '100vh',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    paddingTop: '100px',
};

const sectionStyle = {
    marginBottom: '40px'
};

const outerCardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '10px',
    zIndex: 1,
};

const innerCardStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '10px',
    zIndex: 1,
};

const leftContentStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
};

const bookImageStyle = {
    width: '60px',
    height: '90px',
    objectFit: 'cover',
    borderRadius: '4px',
};

const bookContentStyle = {
    lineHeight: '1.3',
};

const titleStyle = {
    fontSize: '1rem',
    fontWeight: '600',
    margin: 0,
    whiteSpace: 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: 'black',
    wordWrap: 'break-word',
};

const authorStyle = {
    fontSize: '0.95rem',
    margin: '6px 0 0',
    color: '#333',
};

const deleteButtonStyle = {
    backgroundColor: '#990F02',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1.1rem',
};


export default Page;
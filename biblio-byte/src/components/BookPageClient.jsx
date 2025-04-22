"use client";

import Image from "next/image";
import Card from "@/components/Card";
import BookPageHeader from "./BookPageHeader.js";
import Review from "./Review.jsx";
import Listing from "./Listing.jsx";

import React, { useState, useEffect } from "react";

export default function BookPageClient({book, reviews, finds}) {
    const [showReview, setShowReview] = useState(false);
    const [showListing, setShowListing] = useState(false);
    const [reviewsState, setReviewsState] = useState(reviews || []);
    const [findsState, setFindsState] = useState(book.finds || []);
    const averageRating = reviewsState.length > 0
        ? (
            reviewsState.reduce((acc, review) => acc + Number(review.rating || 0), 0)
            / reviewsState.length
        ).toFixed(1)
        : '—';
    const [isOnWatchlist, setIsOnWatchlist] = useState(false);

    const handleToggleWatchlist = async (bookId) => {
        try {
            const method = isOnWatchlist ? 'DELETE' : 'POST';
            const res = await fetch('/api/users/watchlist', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ bookId }),
            });

            const data = await res.json();

            if (res.ok) {
                setIsOnWatchlist(!isOnWatchlist);
                alert(isOnWatchlist ? 'Book removed from your list!' : 'Book added to your list!');
            } else {
                alert(`Error: ${data.message || data.error}`);
            }
        } catch (err) {
            console.error('Watchlist error:', err);
            alert('Something went wrong.');
        }
    };

    useEffect(() => {
        const checkWatchlist = async () => {
            try {
                const res = await fetch('/api/users/me', { credentials: 'include' });
                if (res.ok) {
                    const data = await res.json();
                    const watchlist = data.watchlist || [];
                    const isBookInWatchlist = watchlist.some((entry) => entry.book?.toString() === book._id.toString());
                    setIsOnWatchlist(isBookInWatchlist);
                }
            } catch (err) {
                console.error('Failed to check watchlist:', err);
            }
        };

        checkWatchlist();
    }, [book._id]);

    return (
        <>
            <div className="flex flex-col min-h-screen">
                {/* Navigation Bar */}
                <BookPageHeader/>

                {/* Main Content */}
                <main id="info"
                      className="flex-grow w-full flex flex-col mt-15 sm:flex-row items-center sm:items-start gap-8 bg-gray-100 p-8 sm:p-16 shadow-lg">
                    {/* Image on the Left */}
                    <div className="flex-shrink-0">
                        <img src={book.thumbnail} alt={book.title} className="rounded"/>
                    </div>
                    {/* Text on the Right */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-bold text-gray-800">
                            {book.title}
                        </h1>
                        <h3 className="text-xl font-semibold text-gray-800">
                            <span className="text-4xl font-bold">{averageRating}</span>/5
                        </h3>
                        <a>
                            <button
                                onClick={() => handleToggleWatchlist(book._id)}
                                className="px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-300 hover:text-black focus:outline-none"
                                style={{backgroundColor: 'rgba(11,79,74, 1)'}}
                            >
                                {isOnWatchlist ? 'Remove from List' : 'Add to List'}
                            </button>
                        </a>
                        <p className="text-m text-gray-600">
                            {book.description || "No description available"}
                        </p>
                    </div>
                </main>

                {/* Review Section */}
                <section className="w-full bg-gray-250 p-4 sm:p-16 shadow-md">
                    <h2 id="reviews" className="text-3xl font-bold text-white mb-2">Reviews</h2>
                    <button
                        onClick={() => setShowReview(true)}
                        className="px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-300 hover:text-black focus:outline-none"
                        style={{backgroundColor: 'rgba(11,79,74, 1)', marginBottom: '.5rem'}}
                    >
                        Add Review
                    </button>

                    {reviewsState && reviewsState.length > 0 ? (
                        <ul className="space-y-4 mt-4">
                            {reviewsState.map((review) => (
                                <li key={review._id}>
                                    <Card className="bg-white p-4 shadow-md w-full">
                                        <div className="flex items-center gap-4">
                                            <h3 className="text-3xl font-semibold text-black">{review.rating || '—'}</h3>
                                            <div>
                                                <h2 className="text-lg font-bold text-gray-800">Review</h2>
                                                <p className="text-sm font-bold text-gray-700">{review.name || 'User'}</p>
                                                <p className="text-sm text-gray-600">
                                                    {review.comment || 'No comment'}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div
                            className="mt-6 p-6 rounded-2xl border border-gray-600/20 text-center shadow-sm backdrop-blur-xl max-w-xl mx-auto bg-stone-800/30">
                            <p className="text-2xl  text-gray-200 mb-2">No reviews yet</p>
                            <p className="text-md text-gray-400 italic font-light">Be the first to share a review for
                                this book!</p>
                        </div>
                    )}
                </section>


                {/* Find Section */}
                <section id="finds" className="w-full bg-gray-250 p-4 sm:p-16 shadow-md">
                    <h2 className="text-3xl font-bold text-white mb-2">Finds</h2>
                    <button
                        onClick={() => setShowListing(true)}
                        className="px-4 py-2 text-white rounded-md hover:bg-zinc-300 hover:text-black focus:outline-none"
                        style={{
                            backgroundColor: 'rgba(11,79,74, 1)', marginBottom: '.5rem'
                        }} // Replace with your custom RGB color
                    >
                        Add Find
                    </button>

                    {findsState && findsState.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6 mt-4">
                            {findsState.map((find) => (
                                <div key={find._id || Math.random()} className="bg-white p-4 shadow-md rounded-lg">
                                    <h2 className="text-lg font-bold text-gray-800">
                                        {find.url ? 'Link' : find.file ? 'File' : 'Find'}
                                    </h2>
                                    <p className="text-sm font-bold text-gray-700">{find.name || 'User'}</p>
                                    <div>
                                        <p className="text-sm text-gray-600">{find.description || 'No description available'}</p>
                                    </div>

                                    {find.url && (
                                        <a
                                            href={find.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            Visit Link
                                        </a>
                                    )}

                                    {!find.url && find.file && (
                                        <a
                                            href={`/uploads/${find.file}`}
                                            download
                                            className="text-blue-600 underline"
                                        >
                                            Download File
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div
                            className="mt-6 p-6 rounded-2xl border border-gray-600/20 text-center shadow-sm backdrop-blur-xl max-w-xl mx-auto bg-stone-800/30">
                            <p className="text-2xl  text-gray-200 mb-2">No finds yet</p>
                            <p className="text-md text-gray-400 italic font-light">Be the first to share a find for this
                                book!</p>
                        </div>
                    )}
                </section>

                {/* Footer */}
                <footer className="w-full text-white py-4 flex items-center justify-center"
                        style={{backgroundColor: 'rgba(11,79,74, 1)'}}>
                    <p className="text-sm">© 2025 BiblioByte. All rights reserved.</p>

                </footer>
            </div>

            <Review
                show={showReview}
                onClose={() => setShowReview(false)}
                bookId={book._id.toString()}
                onReviewAdded={(newReview) => {
                    const formattedReview = {
                        _id: newReview._id,
                        name: newReview.name,
                        comment: newReview.comment,
                        rating: newReview.rating,
                    };
                    setReviewsState((prev) => [...prev, formattedReview]);
                }}
            />
            <Listing show={showListing} onClose={() => setShowListing(false)}
                     bookId={book._id.toString()}
                     onFindAdded={(newFind) => {
                         setFindsState((prevFinds) => [...prevFinds, newFind]);
                     }}
            />
        </>
    );
}
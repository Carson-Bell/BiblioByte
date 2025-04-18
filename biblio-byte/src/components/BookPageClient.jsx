"use client";

import Image from "next/image";
import Card from "@/components/Card";
import BookPageHeader from "./BookPageHeader.js";
import Review from "./Review.jsx";
import Listing from "./Listing.jsx";

import React, {useState} from "react";

export default function BookPageClient({ book, reviews, finds }) {
  const [showReview, setShowReview] = useState(false);
  const [showListing, setShowListing] = useState(false);

  const handleAddToWatchlist = async (bookId) => {
    try {
      const res = await fetch('/api/users/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // make sure cookies/auth token are included
        body: JSON.stringify({ bookId }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Book added to your watchlist!');
      } else {
        alert(`Error: ${data.message || data.error}`);
      }
    } catch (err) {
      console.error('Watchlist error:', err);
      alert('Something went wrong.');
    }
  };

  return (
      <>
        <div className="flex flex-col min-h-screen">
          {/* Navigation Bar */}
          <BookPageHeader/>

      {/* Main Content */}
      <main id="info" className="flex-grow w-full flex flex-col mt-15 sm:flex-row items-center sm:items-start gap-8 bg-gray-100 p-8 sm:p-16 shadow-lg">
        {/* Image on the Left */}
        <div className="flex-shrink-0">
          <img src={book.thumbnail} alt={book.title} className="rounded" />
        </div>
        {/* Text on the Right */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-gray-800">
            {book.title}
          </h1>
          <h3 className="text-xl font-semibold text-gray-800">
            <span className= "text-4xl font-bold">4.5</span>/5
          </h3>
          <a>
            <button
                onClick={() => handleAddToWatchlist(book._id)}
                className="px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-300 hover:text-black focus:outline-none"
                style={{backgroundColor: 'rgba(11,79,74, 1)'}}
            >
              Add to Watchlist
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

            {reviews && reviews.length > 0 ? (
                <ul className="space-y-4 mt-4">
                  {reviews.map((review) => (
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
                <div className="mt-6 p-6 rounded-2xl border border-gray-600/20 text-center shadow-sm backdrop-blur-xl max-w-xl mx-auto bg-stone-800/30">
                  <p className="text-2xl  text-gray-200 mb-2">No reviews yet</p>
                  <p className="text-md text-gray-400 italic font-light">Be the first to share a review for this book!</p>
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

            {finds && finds.length > 0 ? (
                <ul className="space-y-4 mt-4">
                  {finds.map((find) => (
                      <li key={find._id}>
                        <Card className="bg-white p-4 shadow-md w-full">
                          <div>
                            <h2 className="text-lg font-bold text-gray-800">{find.heading || ''}</h2>
                            <p className="text-sm font-bold text-gray-700">{find.name || 'User'}</p>
                            <div>
                              <p className="text-sm text-gray-600">{find.comment || 'No description available'}</p>
                            </div>
                            {find.url && (
                                <a href={find.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Visit Link</a>
                            )}
                          </div>
                        </Card>
                      </li>
                  ))}
                </ul>
            ) : (
                <div className="mt-6 p-6 rounded-2xl border border-gray-600/20 text-center shadow-sm backdrop-blur-xl max-w-xl mx-auto bg-stone-800/30">
                  <p className="text-2xl  text-gray-200 mb-2">No finds yet</p>
                  <p className="text-md text-gray-400 italic font-light">Be the first to share a find for this book!</p>
                </div>
            )}
  </section>

      {/* Footer */}
      <footer className="w-full text-white py-4 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(11,79,74, 1)'      }}>
        <p className="text-sm">© 2025 BiblioByte. All rights reserved.</p>
        
      </footer>
    </div>

        <Review show={showReview} onClose={() => setShowReview(false)}
                bookId={book._id.toString()}/>
        <Listing show={showListing} onClose={() => setShowListing(false)}
                bookId={book._id.toString()}/>
      </>
  );
}

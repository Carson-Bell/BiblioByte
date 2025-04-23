"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import listing from '../../../../components/Listing';
//import Image from "../../../../assets/pen-to-square.svg";

function Review({ review, onDelete, onEdit }) {
    const { id, score, title, content, user, school } = review;

    return (
        <div style={reviewCardStyle}>
            <div style={scoreStyle}>{score}</div>
            <div style={reviewContentStyle}>
                <h3 style={titleStyle}>{title}</h3>
                <p style={descriptionStyle}>{content}</p>
                <span style={userInfoStyle}>{user} - {school}</span>
            </div>
            <div style={buttonContainerStyle}>
                <button onClick={() => onEdit(review)} style={editButtonStyle}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwnjF5hGaySHesqZtZ3HWVo3uuqMGj3QOYIw&s"
                        alt="Edit"
                        style={penIconStyle}
                    />
                </button>
                <button onClick={() => onDelete(review)} style={deleteButtonStyle}>X</button>
            </div>
        </div>
    );
}


function ListingCard({ listing, onDelete, onEdit }) {
    const { id, title, description } = listing;

    return (
        <div style={listingCardStyle}>
            <div style={reviewContentStyle}>
                <h3 style={titleStyle}>{title}</h3>
                <p style={descriptionStyle}>{description}</p>
                <span style={viewsStyle}>{views} Views</span>
                <p>{description}</p>
            </div>
            <div className="buttonContainer" style={buttonContainerStyle}>
                <button onClick={() => onDelete(listing)} style={deleteButtonStyle}>X</button>
            </div>
        </div>

    );
}


function Page() {
    const [reviews, setReviews] = useState([]);
    const [listings, setListings] = useState([]);
    const [editingReview, setEditingReview] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await fetch('/api/users/me');
                if (!userRes.ok) throw new Error('Failed to fetch user info');
                const userData = await userRes.json();

                const userId = userData._id;

                const res = await fetch(`/api/users/${userId}/listings`);
                if (!res.ok) throw new Error('Failed to fetch user reviews/listings');
                const data = await res.json();

                console.log("Listings data:", data.listings);

                setReviews(data.reviews);
                setListings(data.listings);
            } catch (error) {
                console.error('Error fetching user reviews and listings:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteReview = async (review) => {
        console.log("Review passed to delete handler:", review);

        console.log("Trying to delete review:", review);

        if (!review.bookId || !review.id) {
            console.error("Invalid review detected:", review);
            alert('Invalid review');
            return;
        }

        try {
            const res = await fetch('/api/reviews', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookId: review.bookId,
                    reviewId: review.id
                })
            });

            if (!res.ok) throw new Error('Failed to delete review');

            setReviews(prev => prev.filter(r => r.id !== review.id));
        } catch (error) {
            console.error(error);
            alert('Failed to delete review');
        }
    };

    const handleDeleteListing = async (listing) => {
        if (!listing.bookId || !listing.id) {
            alert('Invalid listing');
            return;
        }

        try {
            const res = await fetch('/api/finds', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookId: listing.bookId,
                    findId: listing.id
                })
            });
            if (!res.ok) throw new Error('Failed to delete listing');
            setListings(prev => prev.filter(l => l.id !== listing.id));
        } catch (error) {
            console.error(error);
            alert('Failed to delete listing');
        }
    };

    const handleEditReview = (review) => {
        setEditingReview(review);
    };

    const saveEditedReview = async () => {
        try {
            const res = await fetch('/api/reviews', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookId: editingReview.bookId,
                    reviewId: editingReview.id,
                    title: editingReview.title,
                    description: editingReview.content,
                    rating: editingReview.score,
                }),
            });

            if (!res.ok) throw new Error('Failed to update review');
            const { updatedReview } = await res.json();

            setReviews((prev) =>
                prev.map((r) => (r.id === updatedReview.id ? updatedReview : r))
            );
            setEditingReview(null);
        } catch (err) {
            console.error(err);
            alert('Failed to update review');
        }
    };



    return (
        <div style={pageStyle}>
            {editingReview && (   // PART OF EDIT REVIEW DISPLAY
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <h2>Edit Review</h2>
                        <input
                            type="text"
                            value={editingReview.title}
                            onChange={(e) =>
                                setEditingReview({ ...editingReview, title: e.target.value })
                            }
                        />
                        <textarea
                            value={editingReview.content}
                            onChange={(e) =>
                                setEditingReview({ ...editingReview, content: e.target.value })
                            }
                        />
                        <input
                            type="number"
                            value={editingReview.score}
                            min="0.5"
                            max="5"
                            step="0.5"
                            onChange={(e) =>
                                setEditingReview({ ...editingReview, score: parseFloat(e.target.value) })
                            }
                        />
                        <button onClick={saveEditedReview}>Save</button>
                        <button onClick={() => setEditingReview(null)}>Cancel</button>
                    </div>
                </div>
            )}

            <div style={sectionStyle}>
                <h1 className="text-3xl font-bold text-white mb-2">Reviews</h1>
                {reviews.length === 0 ? (
                    <div className="mt-6 p-6 rounded-2xl border border-gray-600/20 text-center shadow-sm backdrop-blur-xl max-w-xl mx-auto bg-stone-800/30">
                        <p className="text-2xl text-gray-200 mb-2">No Reviews</p>
                        <p className="text-md text-gray-400 italic font-light">Post some reviews and come back later!</p>
                    </div>
                ) : (
                reviews.map(review => (
                    <Review
                        key={review.id}
                        review={review}
                        onDelete={() => handleDeleteReview(review)}
                        onEdit={handleEditReview}
                    />
                ))
                    )}

            </div>
            <div style={sectionStyle}>
                <h1 className="text-3xl font-bold text-white mb-2">Documents</h1>
                {listings.length === 0 ? (
                    <div className="mt-6 p-6 rounded-2xl border border-gray-600/20 text-center shadow-sm backdrop-blur-xl max-w-xl mx-auto bg-stone-800/30">
                        <p className="text-2xl text-gray-200 mb-2">No Documents</p>
                        <p className="text-md text-gray-400 italic font-light">Upload some files and links and come back later!</p>
                    </div>
                ) : (
                    listings.map(listing => (
                        <ListingCard
                            key={listing.id}
                            listing={listing}
                            onDelete={handleDeleteListing}
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
    marginBottom: '40px',
};

const reviewCardStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '10px',
    width: '100%',
    justifyContent: 'space-between',
};

const scoreStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginRight: '20px',
    flex: '0 0 auto',
};

const reviewContentStyle = {
    flex: '1',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    overflow: 'hidden',
};

const userInfoStyle = {
    fontSize: '14px',
    color: '#666'
};

const listingCardStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '10px',
    width: '100%',
    justifyContent: 'space-between',
};

const titleStyle = {
    fontWeight: 'bold',
    marginBottom: '5px',
    fontSize: '1rem',
    color: 'black',
    whiteSpace: 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};

const viewsStyle = {
    fontSize: '14px',
    color: '#666',
    marginTop: '5px',
};

const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: '10px',
    alignItems: 'center',
    marginTop: '10px',
};

const editButtonStyle = {
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1.1rem',
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

const penIconStyle = {
    width: '20px',
    height: '20px',
    color: 'white',
};

const descriptionStyle = {
    fontSize: '14px',
    color: '#666',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    overflow: 'hidden',
};

{/* HERE'S THE EDIT STYLING PLEASE FIX IT*/}
const modalOverlayStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
};

export default Page;

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
                <button onClick={() => onDelete(id)} style={deleteButtonStyle}>X</button>
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
            <div style={buttonContainerStyle}>
                <button onClick={() => onEdit(listing)} style={editButtonStyle}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwnjF5hGaySHesqZtZ3HWVo3uuqMGj3QOYIw&s"
                        alt="Edit"
                        style={penIconStyle}
                    />
                </button>
                <button onClick={() => onDelete(listing)} style={deleteButtonStyle}>X</button>
            </div>
        </div>

    );
}


function Page() {
    const [reviews, setReviews] = useState([]);
    const [listings, setListings] = useState([]);

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

                setReviews(data.reviews);
                setListings(data.listings);
            } catch (error) {
                console.error('Error fetching user reviews and listings:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteReview = async (id) => {
        alert('placeholder');
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
        // Add your modal logic or inline editing form here
        alert(`Open review edit modal for: ${review.title}`);
    };

    const handleEditListing = (listing) => {
        // Add your modal logic or inline editing form here
        alert(`Open listing edit modal for: ${listing.title}`);
    };



    return (
        <div style={pageStyle}>
            <div style={sectionStyle}>
                <h1 className="text-3xl font-bold text-white mb-2">Reviews</h1>
                {reviews.map(review =>
                    <Review
                        key={review.id}
                        review={review}
                        onDelete={handleDeleteReview}
                        onEdit={handleEditReview}
                    />
                )}

            </div>
            <div style={sectionStyle}>
                <h1 className="text-3xl font-bold text-white mb-2">Documents</h1>
                    {listings.map(listing =>
                        <ListingCard
                            key={listing.id}
                            listing={listing}
                            onDelete={handleDeleteListing}
                            onEdit={handleEditListing}
                        />
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


export default Page;

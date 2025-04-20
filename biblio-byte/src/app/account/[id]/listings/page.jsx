"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Review({ score, title, content, user, school }) {
    return (
        <div style={reviewCardStyle}>
            <div style={scoreStyle}>{score}</div>
            <div style={reviewContentStyle}>
                <h3 style={titleStyle}>{title}</h3>
                <p>{content}</p>
                <span style={userInfoStyle}>{user} - {school}</span>
            </div>
        </div>
    );
}


function Listing({ title, description, views }) {
    return (
        <div style={listingCardStyle}>
            <h3 style={titleStyle}>{title}</h3>
            <p>{description}</p>
            <span style={viewsStyle}>{views} Views</span>
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


    return (
        <div style={pageStyle}>
            <div style={sectionStyle}>
                <h1 className="text-3xl font-bold text-white mb-2">Reviews</h1>
                {reviews.map(review =>
                    <Review
                        key={review.id}
                        score={review.score}
                        title={review.title}
                        content={review.content}
                        user={review.user}
                        school={review.school}
                    />
                )}
            </div>
            <div style={sectionStyle}>
                <h1 className="text-3xl font-bold text-white mb-2">Documents</h1>
                <div style={listingContainerStyle}>
                    {listings.map(listing =>
                        <Listing
                            key={listing.id}
                            title={listing.title}
                            description={listing.description}
                            views={listing.views}
                        />
                    )}
                </div>
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
    marginBottom: '10px'
};

const scoreStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginRight: '20px'
};

const reviewContentStyle = {
    flex: '1'
};

const userInfoStyle = {
    fontSize: '14px',
    color: '#666'
};

const listingCardStyle = {
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '10px'
};

const titleStyle = {
    fontWeight: 'bold',
    marginBottom: '5px'
};

const viewsStyle = {
    fontSize: '14px',
    color: '#666'
};

const listingContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
};

export default Page;

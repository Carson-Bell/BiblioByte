"use client";
import React, { useState } from 'react';


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
    const [reviews, setReviews] = useState([
        { id: 1, score: 4.5, title: "Very Helpful", content: "Alice - University A", user: "Alice", school: "University A" },
        { id: 2, score: 3.5, title: "Good but not great", content: "Could be better.", user: "Bob", school: "University B" }
    ]);
    const [listings, setListings] = useState([
        { id: 1, title: "Semester Notes", description: "Complete notes for the semester", views: 17 },
        { id: 2, title: "CSCI Textbook", description: "Introduction to Computer Science", views: 0 }
    ]);

    return (
        <div style={pageStyle}>
            <div style={sectionStyle}>
                <h1>Reviews</h1>
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
                <h1>Listings</h1>
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
    marginBottom: '40px'
};

const reviewCardStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
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

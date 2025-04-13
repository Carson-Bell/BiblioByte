'use client';

import React, { useState } from 'react';

function Review({ bookId, onReviewSubmitted }) {
    const [review, setReview] = useState({
        title: '',
        content: '',
        rating: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="review-card" style={cardStyle}>
            <h3>Add a Review</h3>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input
                    type="text"
                    name="title"
                    placeholder="Review Title"
                    value={review.title}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                />
                <textarea
                    name="content"
                    placeholder="Review Content"
                    value={review.content}
                    onChange={handleInputChange}
                    style={textareaStyle}
                    required
                />
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating (1-5)"
                    value={review.rating}
                    onChange={handleInputChange}
                    style={inputStyle}
                    min="1"
                    max="5"
                    required
                />
                <button type="submit" style={buttonStyle}>Submit Review</button>
            </form>
        </div>
    );
}

// Styles
const cardStyle = {
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    margin: '20px 0'
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column'
};

const inputStyle = {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc'
};

const textareaStyle = {
    minHeight: '100px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px'
};

const buttonStyle = {
    padding: '10px 15px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};

export default Review;
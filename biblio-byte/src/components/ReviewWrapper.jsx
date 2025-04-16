'use client';

import React, { useState } from 'react';
import Review from './Review';

export default function ReviewWrapper({ bookId }) {
    const [showReview, setShowReview] = useState(false);
    const [currentBookId, setCurrentBookId] = useState(bookId); // Persist bookId in state

    const handleClose = () => {
        setShowReview(false);
    };

    const handleOpen = () => {
        setCurrentBookId(bookId); // Ensure bookId is set when opening the modal
        setShowReview(true);
    };

    return (
        <>
            <button onClick={handleOpen}>Add Review</button>
            {showReview && (
                <Review show={showReview} onClose={handleClose} bookId={bookId} />
            )}
        </>
    );
}
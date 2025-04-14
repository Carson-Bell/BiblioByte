'use client';

import React, { useState } from 'react';
import Review from './Review';

export default function ReviewWrapper({ bookId }) {
    console.log("ReviewWrapper received bookId:", bookId); // debug

    const [showReview, setShowReview] = useState(false);

    const handleClose = () => {
        setShowReview(false);
    };

    if (!bookId) return null;

    return (
        <Review show={showReview} onClose={handleClose} bookId={bookId} />
    );
}
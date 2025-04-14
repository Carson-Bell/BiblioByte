'use client';

import React, { useState } from 'react';
import Review from './Review';

export default function ReviewWrapper({ bookId }) {
    const [showReview, setShowReview] = useState(true);

    const handleClose = () => {
        setShowReview(false);
    };

    return (
        <Review show={showReview} onClose={handleClose} bookId={bookId} />
    );
}
'use client';

import React, { useState, useEffect } from 'react';

export default function Review({ show, onClose, bookId }) {
    console.log("Review.jsx received bookId:", bookId); // debug

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        rating: 1
    });

    useEffect(() => {
        // Lock body scroll when the modal is visible
        document.body.style.overflow = show ? 'hidden' : 'auto';
    }, [show]);

        if (!show) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.description || !formData.rating || !bookId) {
            alert("All fields are required.");
            return;
        }
    
        const reviewData = {
            ...formData,
            bookId
        };

        const payload = {
            ...formData,
            bookId: bookId // Use bookId directly from props
        };

        console.log("Sending review payload:", { ...formData, bookId }); // jen debugging

        try {
            const response = await fetch(`/api/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Review submitted!');
                onClose();
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review.');
        }

    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-md shadow-lg min-w-[300px] relative"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-semibold mb-4 text-black">Add a Review</h2>
                <form
                    className="flex flex-col gap-3"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label className="block font-semibold mb-2">
                            Name
                        </label>
                        <textarea
                            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500"
                            name="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            rows={1}
                        ></textarea>
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">
                            Description
                        </label>
                        <textarea
                            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500"
                            name="description"
                            placeholder="What's your review?"
                            value={formData.description}
                            onChange={handleChange}
                            rows={6}
                        ></textarea>
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">
                            Rating
                        </label>
                        <select
                            name="rating"
                            className="w-full border px-2 py-2 rounded text-black"
                            value={formData.rating}
                            onChange={handleChange}
                        >
                            {[...Array(10).keys()].map(x => (
                                <option key={x} value={(x + 1) * 0.5}>
                                    {(x + 1) * 0.5}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                    >
                        Submit
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

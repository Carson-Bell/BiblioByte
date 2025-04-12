'use client';
import React from 'react';

export default function BookPreviewModal({ isOpen, onClose, onConfirm, book }) {
    if (!isOpen || !book) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4 text-center">Is this your book?</h2>

                <div className="flex flex-col items-center text-center">
                    {book.thumbnail && (
                        <img
                            src={book.thumbnail}
                            alt={book.title}
                            className="w-32 h-48 object-cover mb-4"
                        />
                    )}
                    <p className="font-semibold">{book.title}</p>
                    <p className="text-gray-600 mb-2">{book.author}</p>
                    <p className="text-sm">{book.description?.slice(0, 150)}...</p>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}

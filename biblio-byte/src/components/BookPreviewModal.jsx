'use client';
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function BookPreviewModal({ isOpen, onClose, onConfirm, book, searchTerm }) {
const router = useRouter();

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen || !book) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mt-18"
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
                        onClick={async () => {
                            await onConfirm?.();
                            setTimeout(() => {
                                window.location.href = `/search?term=${encodeURIComponent(searchTerm)}&type=Textbook`;
                            }, 500); // short delay for collection update
                        }}
                        className="bg-teal-800 hover:bg-teal-800 text-white font-semibold py-2 px-4 rounded"
                    >
                        Yes
                    </button>

                </div>
            </div>
        </div>
    );
}

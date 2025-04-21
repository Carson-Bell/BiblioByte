'use client';

import React, { useRef, useState } from 'react';

function Listing({ show, onClose, bookId, onFindAdded }) {
    // State to manage file, link, and terms acceptance
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [link, setLink] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [description, setDescription] = useState('');

    // Handling file input changes
    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Save the first file
    };

    const handleClickUpload = () => {
        fileInputRef.current.click(); // Trigger file input click event
    };

    // Handling link input changes
    const handleLinkChange = (event) => {
        setLink(event.target.value);
    };

    // Handling checkbox state change
    const handleCheckboxChange = (event) => {
        setTermsAccepted(event.target.checked);
    };

    // Handling form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!termsAccepted) {
            alert('You must accept the terms and conditions to submit.');
            return;
        }
        console.log("Submitting Listing", { file, link });

        // Simulate API call with a promise
        try {
            // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('bookId', bookId); // Pass the bookId
        if (file) {
            formData.append('file', file); // Add the file if provided
        }
        if (link) {
            formData.append('url', link); // Add the link if provided
        }

        // Make the API call
        const response = await fetch('/api/finds', {
            method: 'POST',
            body: JSON.stringify({
                bookId,
                file: file ? file.name : null, // Send file name if file exists
                url: link || null, // Send URL if provided
                description: description || '',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to submit listing, you may not be logged in.');
        }

            const createdFind = await response.json();

            if (onFindAdded) {
                onFindAdded(createdFind);
            }

        alert('Listing submitted successfully!');
            //clear the form inputs
            setFile(null); // Clear the file state
            setLink(''); // Clear the link input
            setTermsAccepted(false);
            setDescription('');
            fileInputRef.current.value = ''; // Reset file input
            onClose(); // Optionally close the modal/dialog
        } catch (error) {
            console.error("Failed to submit listing:", error);
            alert('Failed to submit listing. Please try again.');
        }
    };

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-md shadow-lg min-w-[300px] relative"
                onClick={(e) => e.stopPropagation()}
            >
                <form
                    className="flex flex-col gap-3"
                    onSubmit={handleSubmit}
                >
                    {/* logic to show the uploaded file i think */}
                    {file && (
                        <div className="mb-2 text-black">
                            Selected File: <span className="font-semibold">{file.name}</span>
                        </div>
                    )}

                    <div>
                        <button
                            type="button"
                            onClick={handleClickUpload}
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 focus:outline-none"
                        >
                            Upload File
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">
                            Or Enter a Link
                        </label>
                        <input
                            type="text"
                            placeholder="Link"
                            value={link}
                            onChange={handleLinkChange}
                            className="w-full border px-2 py-1 rounded text-black"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">
                            Description
                        </label>
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border px-2 py-1 rounded text-black"
                            rows="3"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">
                            <input
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={handleCheckboxChange}
                                className="mr-2"
                            />
                            This file/link complies with academic honesty code
                        </label>
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

export default Listing;

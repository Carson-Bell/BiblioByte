"use client";
import AddBook from '@/components/AddBook';
import React from 'react';

const CreateBook = () => {
    const handleAddBook = async (newBook: { title: string; author: string; description: string; link: string }) => {

        try {
            const response = await fetch('/api/books/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });
    
            if (response.status === 400) {
                const errorData = await response.json();
                alert(errorData.message); // Display duplicate error message
                return;
            }
    
            if (!response.ok) {
                throw new Error('Failed to add book');
            }
    
            const createdBook = await response.json();
            console.log('New Book Added:', createdBook);
            alert('Book added successfully!');
        } catch (error) {
            console.error('Error adding book:', error);
            alert('Failed to add book. Please try again.');
        }

        console.log('New Book Added:', newBook);
        // Add logic to save the book (e.g., API call or state update)
    };

    return (
        <div
            style={{
                position: 'relative',
                minHeight: '100vh',
                backgroundImage: 'url(../assets/bookBack.png)', // Replace with your background image path
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex', // Use flexbox for centering
                justifyContent: 'center', // Center horizontally
                alignItems: 'center', // Center vertically
            }}
        >
            <div
                style={{
                    position: 'fixed',
                    width: '100%',
                    maxWidth: '600px',
                    padding: '20px',
                    borderRadius: '10px',
                    backgroundColor: 'white',
                }}
            >
                <h1 className="text-4xl font-bold mb-6 text-center">Create a New Book</h1>
                <AddBook onAddBook={handleAddBook}/>
            </div>
        </div>
    );
};

export default CreateBook;
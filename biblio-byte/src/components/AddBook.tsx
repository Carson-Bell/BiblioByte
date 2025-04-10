"use client";
import { useState } from 'react';
import Card from './Card'; 
import Button from './Button'; // Adjust the import path as necessary

type AddBookProps = {
  onAddBook: (book: {title: string; author: string; description: string; link: string}) => void;
};


export default function AddBook({onAddBook}: AddBookProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate a link based on the title
    const link = title.toLowerCase().replace(/\s+/g, '-');

    // Call the onAddBook function with the new book data
    onAddBook({ title, author, description, link });

    // Clear the form fields
    setTitle('');
    setAuthor('');
    setDescription('');
  };

  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 py-3">
      <Card className={`w-full max-w-lg p-3 bg-white shadow-md rounded-md`}>
       <h1 className="text-4xl font-bold mb-6 text-center">Add Book</h1>
        <form onSubmit={handleSubmit}>
         <label htmlFor="title">Title</label>
          <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
            name="title"
            type="text"
            placeholder="Enter textbook name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="author">Author</label>
          <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
            name="author"
            type="text"
            placeholder="Enter textbook author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label htmlFor="description">Description</label>
          <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
            name="discription"
            type="text"
            placeholder="What's the book about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit">Add Book</Button>
        </form>
      </Card>
      </div>
    );
  }
  
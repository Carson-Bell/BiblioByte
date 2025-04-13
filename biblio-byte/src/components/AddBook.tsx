"use client";
import { useState } from 'react';
import Card from './Card'; 
import Button from './Button'; // Adjust the import path as necessary

type AddBookProps = {
  onAddBook: (book: { title: string; author: string; description: string; link: string }) => void;
};

export default function AddBook({ onAddBook }: AddBookProps) {
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
    <div className="flex justify-center items-center min-h-screen py-6">
      <Card
        className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg"
      >
        <h1 className="text-5xl font-bold mb-8 text-center">Add Book</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block font-semibold mb-2">
              Title
            </label>
            <input
              className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500"
              name="title"
              type="text"
              placeholder="Enter textbook name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="author" className="block font-semibold mb-2">
              Author
            </label>
            <input
              className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500"
              name="author"
              type="text"
              placeholder="Enter textbook author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-semibold mb-2">
              Description
            </label>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500"
              name="description"
              placeholder="What's the book about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
            ></textarea>
          </div>
          <Button type="submit" className="w-full py-4 text-lg font-bold bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add Book
          </Button>
        </form>
      </Card>
    </div>
  );
}

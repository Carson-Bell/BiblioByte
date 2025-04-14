"use client";
import React, { useState } from 'react';
import BookPreviewModal from "@/components/BookPreviewModal";


type Book = {
  title: string;
  author: string;
  description: string;
  link: string;
  thumbnail?: string;
};

type AddBookProps = {
  onAddBook: (book: Book) => void;
};

export default function AddBook({ onAddBook }: AddBookProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [previewBook, setPreviewBook] = useState<Book | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const query = `${title} ${author}`;
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.items && data.items.length > 0) {
      const volume = data.items[0].volumeInfo;
      const matchedBook: Book = {
        title: volume.title || title,
        author: (volume.authors?.[0]) || author,
        description: volume.description || description,
        link: volume.infoLink || link,
        thumbnail: volume.imageLinks?.thumbnail || '',
      };

      setPreviewBook(matchedBook);
      setModalOpen(true);
    } else {
      // for no match found
      onAddBook({ title, author, description, link });
    }
  };

  const handleConfirm = async () => {
    if (!previewBook) return;

    try {
      const res = await fetch('/api/books/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(previewBook),
      });

      if (!res.ok) throw new Error('Failed to add book');

      console.log('Book added to collection');
    } catch (err) {
      console.error('Error adding book:', err);
    } finally {
      setModalOpen(false);
    }
  }

  return (
      <>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="p-2 border rounded"
          />
          <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="p-2 border rounded"
          />
          <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 border rounded"
          />
          <input
              type="url"
              placeholder="Link (optional)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="p-2 border rounded"
          />
          <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Submit
          </button>
        </form>

        <BookPreviewModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleConfirm}
            book={previewBook}
        />
      </>
  );
}

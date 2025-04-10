"use client";
import { useState } from 'react'; // Import useState for state management
import Link from 'next/link'; // Import Next.js Link for navigation
import Books from '../../components/Books'; // Adjust the import path as necessary
import AddBook from '@/components/AddBook';
// Define the type for a single book
type Book = {
  id: number; // Unique identifier for each book
  title: string;
  author: string;
  description: string;
  link: string;
};

// Define the initial list of books
export default function Home() {

  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A novel set in the 1920s that explores themes of decadence and excess.',
      link: 'the-great-gatsby',
    },
  ]);

  //func to add new book
  const addBook = (newBook: Omit<Book, 'id'>) => {
    setBooks((prevBooks) => [
      ...prevBooks,
      {id: prevBooks.length + 1, ...newBook},
      ]);
  };

  return ( 
    <div>   

      <div className="flex flex-col items-center justify-center p-3 bg-gray-100" style={{ marginTop: '80px' }}>
        <h1 className="text-4xl font-bold mb-6">Search Results:</h1>
        <Books prop={books}/>
      </div>
      <AddBook onAddBook={addBook} />
    </div>
  );
}

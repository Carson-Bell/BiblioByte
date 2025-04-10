"user client";
import {useState} from 'react'; // Import useState for state management
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
const BOOKS_INIT: Book[] = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A novel set in the 1920s that explores themes of decadence and excess.',
    link: 'the-great-gatsby',
  },
];

export default function Home() {
  return ( 
    <div>   

      <div className="flex flex-col items-center justify-center p-3 bg-gray-100" style={{ marginTop: '80px' }}>
        <h1 className="text-4xl font-bold mb-6">Search Results:</h1>
        <Books prop={BOOKS_INIT}/>
      </div>
      <AddBook />
    </div>
  );
}

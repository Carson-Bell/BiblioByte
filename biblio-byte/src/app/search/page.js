import React from 'react';
import Link from 'next/link'; // Import Next.js Link for navigation
import Books from '../../components/Books'; // Adjust the import path as necessary
import { link } from 'fs';

export default function SearchPage(){
  return (
    <div style={styles.container}>
      <h1>Book Search</h1>
      <div style={styles.grid}>
       <Books prop = {BOOKS_INIT}/>
      </div>
    </div>
  );

}

const BOOKS_INIT = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A novel set in the 1920s that explores themes of decadence and excess.',
    link: 'the-great-gatsby',
  },
];

const BookCard = ({ title, author, description, link }) => (
  <Link href={`/search/${link}`} passHref> {/* Dynamic link */}
    <div style={styles.card}>
      <h2>{title}</h2>
      <h4>by {author}</h4>
      <p>{description}</p>
    </div>
  </Link>
);


const styles = {
  container: {
    padding: '20px',
    paddingTop: '100px',
    fontFamily: 'Arial, sans-serif',
    maxHeight: '100vh',
    overflowY: 'auto',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
};

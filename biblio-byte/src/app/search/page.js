import React from 'react';
import Link from 'next/link'; // Import Next.js Link for navigation

const books = [
  {
    title: 'Intro to React',
    author: 'John Doe',
    description: 'Book, book, book.',
    link: 'intro-to-react', // Use dynamic id for the link
  },
  {
    title: 'Advanced React',
    author: 'Jane Smith',
    description: 'Advanced concepts in React.',
    link: 'advanced-react',
  },
  {
    title: 'React and Redux',
    author: 'Alice Johnson',
    description: 'Managing state with Redux.',
    link: 'react-and-redux',
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

const SearchPage = () => {
  return (
    <div style={styles.container}>
      <h1>Book Search</h1>
      <div style={styles.grid}>
        {books.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            author={book.author}
            description={book.description}
            link={book.link} // Pass the dynamic id to the BookCard
          />
        ))}
      </div>
    </div>
  );
};

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

export default SearchPage;
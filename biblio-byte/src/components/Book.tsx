import Link from 'next/link';
import Card from './Card';

interface BookProps {
  book: {
    title: string;
    author: string;
    description: string;
    link: string;
  };
};

export default function Book({ book }: BookProps) {
    return (
      <Card className="book-card">
        <Link href={`/search/${book.link}`} passHref> {/* Dynamic link */}
            <h2>Title: {book.title}</h2>
          <p>Author: {book.author}</p>
          <p>description: {book.description}</p>
    </Link>
      </Card>
    );
  }
  
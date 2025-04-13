import Link from 'next/link';
import Card from './Card';
import { Book as BookType } from '../types/Book';

type BookProps = {
    book: BookType;
}

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
  
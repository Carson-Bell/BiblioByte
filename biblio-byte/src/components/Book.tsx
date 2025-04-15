import Link from 'next/link';
import Card from './Card';
import { Book as BookType } from '../types/Book';

type BookProps = {
    book: BookType;
}

export default function Book({book}: BookProps) {
    return (
        <Card className="book-card">
            <div style={{padding: '10px'}}>
                <Link href={`/search/${book._id}`} passHref>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            maxHeight: '120px',
                            overflow: 'hidden',
                        }}
                    >
                        {book.thumbnail && (
                            <img
                                src={book.thumbnail}
                                alt={`Cover of ${book.title}`}
                                style={{
                                    width: '70px',
                                    height: '100px',
                                    objectFit: 'cover',
                                    borderRadius: '4px',
                                    marginLeft: '0',
                                    flexShrink: 0,
                                }}
                            />
                        )}
                        <div style={{flex: 1, lineHeight: '1.3'}}>
                            <h2
                                style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    margin: 0,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                Title: {book.title}
                            </h2>
                            <p
                                style={{
                                    fontSize: '0.95rem',
                                    margin: '6px 0 0',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Author: {book.author}
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </Card>
    );
  }
  
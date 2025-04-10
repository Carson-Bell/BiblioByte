import Card from './Card'; // Adjust the import path as necessary
import Link from 'next/link'; // Import Next.js Link for navigation
import Book from './Book'; // Adjust the import path as necessary

type Book = {
    id: number;
    title: string;
    author: string;
    description: string;
    link: string;
};

type BookProps = {
    prop: Book[];
};

function Books({prop}: BookProps) {
    return (
        <div>
            {prop.map((book) => (
                <Card key={book.id} className ="book-card">
                    <Book book={book}/>
                </Card>
            ))}
        </div>
    );
}

export default Books;
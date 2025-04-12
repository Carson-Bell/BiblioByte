import Card from './Card'; // Adjust the import path as necessary
import Link from 'next/link'; // Import Next.js Link for navigation
import Book from './Book'; // Adjust the import path as necessary

type Book = {
    _id: number;
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
        <div style={{
            backgroundColor: 'rgb(255,255,255,.8)', // White background for each book
            padding: '5px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            {prop.map((book) => (
                <div
                    key={book._id}
                    style={{
                        margin: '10px 0',
                        width: '100%',
                        maxWidth: '400px',
                        padding: '15px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        backgroundColor: 'white',
                    }}
                >
                    <Card className="book-card">
                        <Book book={book}/>
                    </Card>
                </div>
            ))}
        </div>
    );
}

export default Books;
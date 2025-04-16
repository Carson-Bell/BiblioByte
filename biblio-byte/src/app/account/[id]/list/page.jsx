"use client";
import React, {useState} from "react";

function BookCard({ title, author, school, description }) {
    return (
        <div style={bookCardStyle}>
            <div style={bookContentStyle}>
                <h3 style={titleStyle}>{title}</h3>
                <p><strong>Author:</strong> {author}</p>
                <p><strong>School:</strong> {school}</p>
                <p>{description}</p>
            </div>
        </div>
    );
}
function Page() {
    const [savedBooks, setSavedBooks] = useState([
        {
            id: 1,
            title: "Introduction to Algorithms",
            author: "Cormen, Leiserson, Rivest, and Stein",
            school: "MIT",
            description: "Comprehensive guide to modern algorithm design and analysis."
        },
        {
            id: 2,
            title: "Computer Networking: A Top-Down Approach",
            author: "Kurose and Ross",
            school: "Georgia Tech",
            description: "Explains networking concepts starting from applications down to the physical layer."
        }
    ]);

    return (
        <div style={pageStyle}>
            <div style={sectionStyle}>
                <h1>Saved Books</h1>
                {savedBooks.map(book => (
                    <BookCard
                        key={book.id}
                        title={book.title}
                        author={book.author}
                        school={book.school}
                        description={book.description}
                    />
                ))}
            </div>
        </div>
    );

}
const pageStyle = {
    height: '100vh',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    paddingTop: '100px',
};

const sectionStyle = {
    marginBottom: '40px'
};

const bookCardStyle = {
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '10px'
};

const bookContentStyle = {
    flex: '1'
};

const titleStyle = {
    fontWeight: 'bold',
    marginBottom: '5px'
};

export default Page;
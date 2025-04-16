"use client";
import React, {useState} from "react";

function BookCard({ title, author, school }) {
    return (
        <div style={bookCardStyle}>
            <div style={bookContentStyle}>
                <h3 style={titleStyle}>{title}</h3>
                <p><strong>Author:</strong> {author}</p>
            </div>
            <div>
                <button
                    style={deleteButtonStyle}
                    onClick={() => onDelete(id)}
                >
                    X
                </button>
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
        },
        {
            id: 2,
            title: "Computer Networking: A Top-Down Approach",
            author: "Kurose and Ross"
        }
    ]);

    return (
        <div style={pageStyle}>
            <div style={sectionStyle}>
                <h1 className="text-3xl font-bold text-white mb-2" align='center'>Saved Books</h1>
                {savedBooks.map(book => (
                    <BookCard
                        key={book.id}
                        title={book.title}
                        author={book.author}
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
    borderRadius: '8px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

const bookContentStyle = {
    flex: 1,
    marginRight: '20px'
};

const titleStyle = {
    fontWeight: 'bold',
    marginBottom: '5px'
};

const deleteButtonStyle = {
    backgroundColor: '#990F02',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
};

export default Page;
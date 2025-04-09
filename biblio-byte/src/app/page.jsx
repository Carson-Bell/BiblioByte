// SPLASH PAGE
'use client';
// pages/index.js
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';



export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('Textbook');

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    searchType,
                    searchTerm,
                }),
            });
    
            if (res.ok) {
                const data = await res.json();
                console.log('Search results:', data);
            } else {
                console.error('Search failed');
            }
        } catch (error) {
            console.error('Error during search:', error);
        }
   
    };

    return (
        <>
            <Head>
                <title>BiblioByte</title>
            </Head>
            <div style={pageStyle}>
                <div style={cardStyle}>
                    <div style={headerStyle}>
                        <h1>BiblioByte</h1>
                    </div>
                    <div style={descriptionStyle}>
                        <p>Search for a textbook, class, or school!</p>
                    </div>
                    <form onSubmit={handleSearch} style={formStyle}>
                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            style={selectStyle}
                        >
                            <option value="Textbook">Textbook</option>
                            <option value="Class">Class</option>
                            <option value="School">School</option>
                            

                        </select>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={inputStyle}
                        />

                        {/* Temporary button to navigate to book page */}
                        <Link href="/search/123">
                            <button>Go to book page</button>
                        </Link>

                        <button type="submit" style={buttonStyle}>Search</button>
                    </form>
                </div>
            </div>
        </>
    );
}

// Inline styles
const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4'
};

const cardStyle = {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
};

const headerStyle = {
    textAlign: 'center',
    fontSize: '45px',
    padding: '20px'
}

const descriptionStyle = {
    textAlign: 'center',
    fontSize: '20px',
}

const formStyle = {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const selectStyle = {
    padding: '10px',
    marginRight: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer'
};

const inputStyle = {
    padding: '10px',
    marginRight: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '250px',
    cursor: 'text'
};

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
};

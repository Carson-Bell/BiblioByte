// SPLASH PAGE
'use client';
// pages/index.js
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('Textbook');
    const router = useRouter();

    const handleSearch = async (event) => {
        event.preventDefault();
        if (!searchTerm.trim()) return;

        router.push(`/search?term=${encodeURIComponent(searchTerm)}&type=${searchType}`);
    };

    return (
        <>
            <Head>
                <title>BiblioByte</title>
            </Head>
            <div style={backgroundStyle}>
                <div style={cardStyle}>
                    <div className="text-3xl font-semibold hover:font-bold text-white" style={headerStyle}>
                    BiblioByte
                    </div>
                    <div className= "text-white" style={descriptionStyle}>
                        <p>Search for a textbook, class, or school!</p>
                    </div>
                    <form onSubmit={handleSearch} style={formStyle}>
                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            style={selectStyle}
                        >
                            <option  value="Textbook">Textbook</option>
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

                        <button type="submit" style={buttonStyle}>Search</button>
                    </form>

                    {/* Temporary button to navigate to book page */}
                    <Link href="/search/123">
                        <button>Go to book page</button>
                    </Link>

                </div>
            </div>
        </>
    );
}

const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex', // Use flexbox
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    zIndex: -1 // Ensures the background stays behind the card
};

const cardStyle = {
    textAlign: 'center',
    backgroundColor: 'rgba(11,79,74, 1)', // Semi-transparent background
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '600px',
    width: '90%', // Make it responsive for smaller screens
    zIndex: 1 // Ensures the card is above the background
};

const headerStyle = {
    textAlign: 'center',
    fontSize: '45px',
    padding: '20px'
};

const descriptionStyle = {
    textAlign: 'center',
    fontSize: '20px',
};

const formStyle = {
    marginRight: '2px',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const selectStyle = {
    backgroundColor: 'rgba(0,95,90, .2)',
    padding: '10px',
    marginRight: '10px',
    border: '2px solid #022f2e',
    borderRadius: '5px',
    cursor: 'pointer'
};

const inputStyle = {
    padding: '10px',
    marginRight: '10px',
    border: '2px solid #022f2e',
    borderRadius: '5px',
    width: '250px',
    cursor: 'text'
};

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: 'oklch(27.7% 0.046 192.524)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
};

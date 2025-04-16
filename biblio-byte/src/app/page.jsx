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
                <div style={columnsStyle}>
                    {/* Left Column */}
                    <div style={leftColumnStyle}>
                    </div>

                    {/* Center Column: BiblioByte Card */}
                    <div style={cardStyle}>
                        <div className="text-3xl font-semibold hover:font-bold text-white" style={headerStyle}>
                            BiblioByte
                        </div>
                        <div className="text-white" style={descriptionStyle}>
                            <p>Search for a textbook, class, or school!</p>
                        </div>
                        <form onSubmit={handleSearch} style={formStyle}>
                            <select className='text-white'
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value)}
                                style={selectStyle}
                            >
                                <option value="Textbook" className='text-black'>Textbook</option>
                                <option value="Class" className='text-black'>Class</option>
                                <option value="School" className='text-black'>School</option>
                            </select>
                            <input className='text-white'
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={inputStyle}
                            />
                            <button type="submit" style={buttonStyle}>Search</button>
                        </form>

                    </div>

                    {/* Right Column */}
                    <div style={rightColumnStyle}>
                        <h1 className="text-4xl font-bold text-gray-800">Welcome to BiblioByte!</h1>
                        <p className="text-gray-600 text-xl">
                             BiblioByte is a resource for students to write and read reviews about the quality of their class textbook and determine if it's worth purchasing for their class.
                            BiblioByte can also be used as a platform for students to find places to purchase the textbooks needed for their classes.
                        </p>
                    <br />
                        <p className="text-gray-600 text-xl">
                        Don't see the textbook your looking for? Create an account to add textbooks to BiblioByte and to leave reviews over textbooks you have read.
                        </p>
                    </div>
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

const columnsStyle = {
  display: 'flex', // Flexbox layout for columns
  justifyContent: 'space-between', // Space between columns
  alignItems: 'center', // Align items vertically
  width: '90%', // Ensure the container is responsive
  maxWidth: '1200px', // Limit the maximum width
  margin: '0 auto', // Center the container horizontally
  gap: '20px', // Add space between columns
};

const leftColumnStyle = {
  flex: 1,
  textAlign: 'left',
  padding: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0)', // Transparent background
  borderRadius: '10px',
};

const cardStyle = {
  flex: 2, // Center column takes more space
  textAlign: 'center',
  backgroundColor: 'rgba(11,79,74, 1)', // Semi-transparent background
  padding: '20px',
  borderRadius: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  maxWidth: '600px',
  width: '100%', // Make it responsive for smaller screens
};

const rightColumnStyle = {
  flex: 1, // Take up equal space
  textAlign: 'center', // Center text horizontally
  display: 'flex', // Use flexbox for centering
  flexDirection: 'column', // Ensure content stacks vertically
  justifyContent: 'center', // Center content vertically
  alignItems: 'center', // Center content horizontally
  height: '100%', // Ensure the column takes full height
  padding: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light semi-transparent background
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transform: 'translateY(5%)'
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
    borderColor: 'oklch(27.7% 0.046 192.524)',
    textColor: 'white',
    backgroundColor: 'rgba(0,95,90, .2)',
    padding: '10px',
    marginRight: '10px',
    border: '2px solid #022f2e',
    borderRadius: '5px',
    cursor: 'pointer'
};

const inputStyle = {
    borderColor: 'oklch(27.7% 0.046 192.524)',
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

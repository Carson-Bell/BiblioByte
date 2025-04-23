// SPLASH PAGE
'use client';
// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
    const [isMobile, setIsMobile] = useState(false);
    const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('Textbook');
    const router = useRouter();

    const handleSearch = async (event) => {
        event.preventDefault();
        if (!searchTerm.trim()) { // if nothing entered
            router.push('/search');
        }

        router.push(`/search?term=${encodeURIComponent(searchTerm)}&type=${searchType}`);
    };

    useEffect(() => {
        const handleResize = () => {
            const isNowMobile = window.innerWidth <= 768;
            setIsMobile(isNowMobile);

            // Show popup when switching to mobile
            if (isNowMobile) {
                setShowPopup(true);
            }
        };

        // Initial check
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const closePopup = () => {
        setShowPopup(false); // Close the popup
    };

    if (isMobile) {
        // Render mobile-specific layout
        return (
            <>
                <Head>
                    <title >BiblioByte - Mobile</title>
                </Head>
                <div style={backgroundStyle}>

                {showPopup && (
                    <div style={popupStyle}>
                        <div style={popupContentStyle}>
                            <h1 className="text-4xl font-bold text-gray-800" style={{ fontSize: isMobile ? '24px' : '32px' }}>
                              Welcome to BiblioByte!
                         </h1>
                     <p className="text-gray-600" style={{ fontSize: isMobile ? '14px' : '18px' }}>
                               BiblioByte is a resource for students to write and read reviews about the quality of their class textbook and determine if it's worth purchasing for their class.
                     </p>
                     <p className="text-gray-600" style={{ fontSize: isMobile ? '14px' : '18px' }}>
                              Don't see the textbook you're looking for? Create an account to add textbooks to BiblioByte and to leave reviews over textbooks you have read.
                     </p>
                            <button onClick={closePopup} style={popupButtonStyle}>
                                Close
                            </button>
                        </div>
                    </div>
                )}

                    <div style={cardStyle}>
                        <h1 className="text-3xl font-semibold hover:font-bold text-white" style = {headerStyle}>BiblioByte</h1>
                        <p className="text-white" style={descriptionStyle}>Search for Textbooks!</p>
                        <form onSubmit={handleSearch} style={mobileFormStyle}>
                            <input className='text-white'
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={mobileInputStyle}
                            />
                            <button type="submit" style={buttonStyle}>Search</button>
                        </form>
                    </div>
                </div>
            </>
        );
    }

    // Render desktop layout
    return (
        <>
            <Head>
                <title>BiblioByte</title>
            </Head>
            <div style={backgroundStyle}>
                <div style={columnsStyle(isMobile)}>
                    {/* Left Column */}
                    <div style={leftColumnStyle}></div>

                    {/* Center Column: BiblioByte Card */}
                    <div style={cardStyle}>
                        <div className="text-3xl font-semibold hover:font-bold text-white" style={headerStyle}>
                            BiblioByte
                        </div>
                        <div className="text-white" style={descriptionStyle}>
                            <p>Search for a Textbook!</p>
                        </div>
                        <form onSubmit={handleSearch} style={formStyle}>
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
                         <h1 className="text-4xl font-bold text-gray-800" style={{ fontSize: isMobile ? '24px' : '32px' }}>
                              Welcome to BiblioByte!
                         </h1>
                     <p className="text-gray-600" style={{ fontSize: isMobile ? '14px' : '18px' }}>
                               BiblioByte is a resource for students to write and read reviews about the quality of their class textbook and determine if it's worth purchasing for their class.
                     </p>
                     <p className="text-gray-600" style={{ fontSize: isMobile ? '14px' : '18px' }}>
                              Don't see the textbook you're looking for? Create an account to add textbooks to BiblioByte and to leave reviews over textbooks you have read.
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

const columnsStyle = (isMobile) => ({
  display: 'flex', // Flexbox layout for columns
  flexDirection: isMobile ? 'column' : 'row', // Stack as rows on mobile, columns otherwise
  justifyContent: 'space-between', // Space between columns
  alignItems: 'center', // Align items vertically
  width: '90%', // Ensure the container is responsive
  maxWidth: '1200px', // Limit the maximum width
  margin: '0 auto', // Center the container horizontally
  gap: '20px', // Add space between columns
});

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

const rightColumnStyle =  {
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
    justifyContent: 'center',
    alignItems: 'center',
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

const mobileFormStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    
};

const mobileInputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '2px solid #022f2e',
    width: '100%',
};

const popupStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure it appears above other elements
};

const popupContentStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const popupButtonStyle = {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#0b4f4a',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

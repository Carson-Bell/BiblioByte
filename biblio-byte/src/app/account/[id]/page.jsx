// Profile Page
'use client';
import Head from 'next/head';
import { useState } from 'react';

export default function Page() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [school, setSchool] = useState('');
    const [password, setPassword] = useState('');

    const handleUpdate = (event) => {
        event.preventDefault();
        // Implement update logic here
        console.log(`Profile updated for ${email}`);
    };

    return (
        <>
            <Head>
                <title>Account</title>
            </Head>
            <div style={pageStyle}>
                <div style={cardStyle} className="card1 welcome">
                    <div style={profilePictureStyle}></div>
                    <h2>Welcome back!</h2>
                    <button style={buttonStyle}>Upload Photo</button>
                    <p><strong>First Last</strong></p>
                    <p>school</p>
                    <button style={buttonStyle}>Logout</button>
                </div>
                <div style={{ ...cardStyle, ...card2Style }} className="card2 edit-profile">
                    <h2>Edit Profile</h2>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        style={inputStyle}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                    />
                    <input
                        type="email"
                        placeholder="Confirm Email"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="School"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                    />
                    <button onClick={handleUpdate} style={buttonStyle}>Update</button>
                </div>
            </div>
        </>
    );
}


const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '40px',
    gap: '20px'

};

const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const card2Style = {
    width: '500px',
    height: '420px',
    alignItems: 'center',
};

const profilePictureStyle = {
    background: `url('https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg')`,
    backgroundSize: 'cover',
    height: '200px',
    width: '200px',
    borderRadius: '50%',
    margin: '20px',
    borderColor: 'black'
};

const inputStyle = {
    width: '75%',
    padding: '10px',
    marginTop: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px'
};

const buttonStyle = {
    width: '50%',
    padding: '10px',
    marginTop: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
};
// Profile Page
'use client';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [school, setSchool] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState('https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg');
    const [authenticated, setAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    const handleUpdate = (event) => {
        event.preventDefault();
        // Implement update logic here
        console.log(`Profile updated for ${email}`);
    };

    const handleImageChange = async (event) => {
        if (event.target.files && event.target.files[0]) {
            const formData = new FormData();
            formData.append('image', event.target.files[0]);

            const res = await fetch('/api/users/uploadProfilePic', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            const data = await res.json();

            console.log('Image preview:', data.imageUrl);

            if (res.ok) {
                setProfilePic(data.imageUrl);
            } else {
                console.error('Upload failed:', data.message);
            }
        }
    };


    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            if (res.ok) {
                setAuthenticated(false);
                setUserProfile(null);
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };


    useEffect(() => {
        async function fetchProfile() {
            const res = await fetch('/api/users/me', { credentials: 'include' });
            const data = await res.json();
            if (res.ok) {
                setFullName(data.fullName || '');
                setEmail(data.email || '');
                setConfirmEmail('');
                setSchool(data.school || '');
                setPassword('');
                setProfilePic(data.profilePic || 'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg');
            }
        }
        fetchProfile();
    }, []);


    return (
        <>
            <Head>
                <title>Account</title>
            </Head>
            <div style={pageStyle}>
                <div style={cardStyle} className="card1 welcome">
                    <h1 style={{ fontSize: '24px' }}>Welcome back!</h1>
                    {/* this was previously <div> and i made it <img>*/}
                    <img
                        src={profilePic}
                        alt="Profile"
                        style={{
                            height: '200px',
                            width: '200px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            margin: '20px',
                            border: '2px solid black'
                        }}
                    />
                    <input type="file" onChange={handleImageChange} style={{ display: 'none' }} />
                    <button style={buttonStyle} onClick={() => document.querySelector('input[type="file"]').click()} >
                        Upload Image
                    </button>
                    <p style={{ fontSize: '20px', padding:'10px'}}><strong>{fullName}</strong></p>
                    <p>{school}</p>
                    {/*<button style={buttonStyle} onClick={handleSignOut}>Logout</button>*/}
                </div>
                <div style={{...cardStyle, ...card2Style}} className="card2 edit-profile">
                    <h1 style={{ fontSize: '24px' }}>Edit Profile</h1>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="text-black"
                        style={inputStyle}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-black"
                        style={inputStyle}
                    />
                    <input
                        type="email"
                        placeholder="Confirm Email"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        className="text-black"
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="School"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        className="text-black"
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-black"
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
    //backgroundColor: '#f4f4f4',
    padding: '40px',
    gap: '20px'

};

const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(11,79,74, 1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: 'black',
    color: 'white'
};

const card2Style = {
    width: '500px',
    height: '420px',
    alignItems: 'center'
};

const inputFileStyle = {
    width: '50%',
    padding: '10px',
    marginTop: '10px',
    //backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'block'
};

const buttonStyle = {
    width: '50%',
    padding: '10px',
    marginTop: '10px',
    //padding: '10px 20px',
    backgroundColor: 'oklch(27.7% 0.046 192.524)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const inputStyle = {
    borderColor: 'oklch(27.7% 0.046 192.524)',
    backgroundColor: 'white',
    width: '75%',
    padding: '10px',
    marginTop: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
};
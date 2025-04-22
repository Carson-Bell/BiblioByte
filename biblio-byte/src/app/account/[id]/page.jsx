// Profile Page
'use client';
import Head from 'next/head';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function Page() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [school, setSchool] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState('https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg');
    const [authenticated, setAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    // just for left profile bar
    const [displayFullName, setDisplayFullName] = useState('');
    const [displaySchool, setDisplaySchool] = useState('');

    // validation states
    const [emailError, setEmailError] = useState(false);
    const [confirmEmailError, setConfirmEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    // update loading thing
    const [uploading, setUploading] = useState(false);

    const handleUpdate = async (event) => {
        event.preventDefault();

        let hasError = false;

        if (email.trim() === '') {
            setEmailError(true);
            hasError = true;
        } else {
            setEmailError(false);
        }

        if (confirmEmail.trim() === '' || email !== confirmEmail) {
            setConfirmEmailError(true);
            hasError = true;
        } else {
            setConfirmEmailError(false);
        }

        if (password.trim() === '') {
            setPasswordError(true);
            hasError = true;
        } else {
            setPasswordError(false);
        }

        if (hasError) {
            return;
        }

        try {
            const res = await fetch('/api/users/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    fullName,
                    email,
                    school,
                    profilePic
                })
            });

            const data = await res.json();

            if (res.ok) {
                setDisplayFullName(fullName);
                setDisplaySchool(school);
                setPassword('');
                setConfirmEmail('');
                alert('Profile updated successfully!');
            } else {
                alert('Update failed: ' + data.error);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An unexpected error occurred.');
        }
    };


    const handleImageChange = async (event) => {
        if (event.target.files && event.target.files[0]) {
            setUploading(true);

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
                localStorage.setItem('profilePicUpdated', Date.now());
                setTimeout(() => {
                    window.location.reload(); // short delay to emulate loading
                }, 500);

            } else {
                console.error('Upload failed:', data.message);
                setUploading(false);
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
            const res = await fetch('/api/users/me', {credentials: 'include'});
            const data = await res.json();
            if (res.ok) {
                setFullName(data.fullName || '');
                setEmail(data.email || '');
                setConfirmEmail('');
                setSchool(data.school || '');
                setPassword('');
                setProfilePic(data.profilePic || 'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg');

                // for left profile card
                setDisplayFullName(data.fullName || '');
                setDisplaySchool(data.school || '');
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
                    <h1 style={{fontSize: '24px'}}>Welcome back!</h1>
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

                    {/* BRI CAN YOU STYLE THIS*/}
                    {uploading && (
                        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50">
                            <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center">
                                <svg
                                    className="animate-spin h-8 w-8 text-teal-700 mb-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    ></path>
                                </svg>
                                <p className="text-lg font-semibold text-gray-700">Uploading...</p>
                            </div>
                        </div>
                    )}


                    <input type="file" onChange={handleImageChange} style={{display: 'none'}}/>
                    <button style={buttonStyle} onClick={() => document.querySelector('input[type="file"]').click()}>
                        Upload Image
                    </button>
                    <p style={{fontSize: '20px', padding: '10px'}}><strong>{displayFullName}</strong></p>
                    <p>{displaySchool}</p>
                    {/*<button style={buttonStyle} onClick={handleSignOut}>Logout</button>*/}
                </div>
                <div style={{...cardStyle, ...card2Style}} className="card2 edit-profile">
                    <h1 style={{fontSize: '24px'}}>Edit Profile</h1>
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
                        style={{
                            ...inputStyle,
                            borderColor: confirmEmailError ? 'red' : inputStyle.borderColor
                        }}
                    />
                    {confirmEmailError && (
                        <div style={errorTextStyle}>Emails must match</div>
                    )}
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
                        style={{
                            ...inputStyle,
                            borderColor: passwordError ? 'red' : inputStyle.borderColor
                        }}
                    />
                    {passwordError && (
                        <div style={errorTextStyle}>Password required</div>
                    )}
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
    alignItems: 'center',
    transition: 'height 0.3s ease'
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
    backgroundColor: 'white',
    width: '75%',
    padding: '10px',
    marginTop: '10px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderRadius: '5px',
};

const errorTextStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
};
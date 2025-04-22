'use client';
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('Textbook');
    const router = useRouter(); // Initialize the router
    const [user, setUser] = useState(null);
    const [loggingOut, setLoggingOut] = useState(false);

    const fetchUser = async () => { // moved this outside use effect so it can be used elsewhere
        try {
            const res = await fetch('/api/users/me', {
                credentials: 'include',
            });
            const data = await res.json();
            if (res.ok) {
                setUser({ ...data, profilePicVersion: Date.now() });
            }
        } catch (err) {
            console.error('Failed to load user:', err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const query = searchTerm.trim() || '';
        router.push(`/search?term=${encodeURIComponent(query)}&type=${searchType}`);
    }

    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);


    useEffect(() => {
        async function checkAuthStatus() {
            try {
                const res = await fetch('/api/auth/status', {
                    credentials: 'include' // ensures the token cookie is sent
                });
                if (res.ok) {
                    const data = await res.json();
                    setAuthenticated(data.authenticated);
                    setUserProfile(data.user);
                } else {
                    setAuthenticated(false);
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }
        checkAuthStatus();
    }, []);

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'profilePicUpdated') {
                console.log('Detected profile picture update, refetching user...');
                fetchUser();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    const handleSignOut = async () => {
        try {
            setLoggingOut(true);
            await new Promise(resolve => setTimeout(resolve, 1000));

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

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    useEffect(() => {
        const styleTag = document.createElement("style");
        styleTag.innerHTML = `
        @keyframes l1 {
            0%  {background-size: 20% 100%, 20% 100%, 20% 100%}
            33% {background-size: 20% 10%, 20% 100%, 20% 100%}
            50% {background-size: 20% 100%, 20% 10%, 20% 100%}
            66% {background-size: 20% 100%, 20% 100%, 20% 10%}
            100% {background-size: 20% 100%, 20% 100%, 20% 100%}
        }
    `;
        document.head.appendChild(styleTag);

        return () => {
            document.head.removeChild(styleTag);
        };
    }, []);

    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-zinc-600 shadow-md z-40 p-4 sm:p-4 flex items-center" style={{ backgroundColor: 'rgba(11,79,74,1)'}}>
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="https://www.clker.com/cliparts/o/Y/Q/2/s/1/white-book-reading.svg"
                        alt="Logo"
                        width={50}
                        height={50}
                    />
                    <span className="text-3xl font-semibold hover:font-bold text-white">
                        BiblioByte
                    </span>
                </Link>
                <div className="ml-8 flex-auto">
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Textbook"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-xs px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
                        />
                    </form>
                </div>
                <div className="ml-auto flex gap-4">
                    {authenticated ? (
                        // profile dropdown
                        <>
            <span className="text-white text-xl ml-2">
                Welcome, {user?.fullName}!
            </span>
                            <div
                                onMouseEnter={() => setDropdownOpen(true)}  // Open on hover
                                onMouseLeave={() => setDropdownOpen(false)} // Close when hover ends
                                className="relative z-50"
                            >
                                {/* Profile Image */}
                                {user?.profilePic ? (
                                    <img
                                        src={user.profilePic}
                                        alt="Profile"
                                        style={{
                                            height: '35px',
                                            width: '35px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '1px solid #ccc',
                                            cursor: 'pointer'
                                        }}
                                    />
                                ) : (
                                    <p>Profile</p> // fallback if user hasn’t loaded yet
                                )}

                                {/* Dropdown Menu */}
                                {loggingOut && (
                                    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
                                        <div className="p-8 rounded-2xl shadow-xl flex flex-col items-center" style={{ backgroundColor: 'rgba(11,79,74, 1)' }}>
                                            <div style={loaderStyle}></div>  {/* Custom Loader */}
                                            <p className="text-lg font-semibold text-white" style={{ marginTop: '17px' }}>Logging you out...</p>
                                        </div>
                                    </div>
                                )}

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-0 w-48 bg-white shadow-lg rounded-lg py-2">
                                        <Link href={`/account/${user?._id}`} className="block px-4 py-2 text-black hover:bg-gray-200">Profile</Link>
                                        <Link href={`/account/${user?._id}/list`} className="block px-4 py-2 text-black hover:bg-gray-200">My List</Link>
                                        <Link href={`/account/${user?._id}/listings`} className="block px-4 py-2 text-black hover:bg-gray-200">My Reviews/Documents</Link>
                                        <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-black hover:bg-gray-200">Sign Out</button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        // login/signup buttons
                        <>
                            <button
                                onClick={() => setShowLogin(true)}
                                className="px-4 py-2 bg-zinc-300 text-black rounded-md hover:bg-zinc-900 hover:text-white focus:outline-none"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setShowSignup(true)}
                                className="px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-300 hover:text-black focus:outline-none"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>

            </header>

            <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
            <SignupModal show={showSignup} onClose={() => setShowSignup(false)} />
        </>
    );
}

const loaderStyle = {
    width: '45px',
    aspectRatio: '1',
    '--c': 'no-repeat linear-gradient(#fff 0 0)',
    background: `
        var(--c) 0%   50%,
        var(--c) 50%  50%,
        var(--c) 100% 50%
    `,
    backgroundSize: '20% 100%',
    animation: 'l1 1s infinite linear'
};
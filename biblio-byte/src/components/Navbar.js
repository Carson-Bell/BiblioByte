'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import Link from 'next/link';

export default function Navbar() {
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

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-zinc-600 shadow-md z-40 p-4 flex items-center">
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
                    <input
                        type="text"
                        placeholder="Search for book"
                        className="w-xs px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
                    />
                </div>
                <div className="ml-auto flex gap-4">
                    {authenticated ? (
                        // profile dropdown
                        <>
                            <div onClick={toggleDropdown} className="relative">
                                <Image
                                    src={userProfile ? userProfile.picture : '/default-profile.png'} // Fallback to a default picture if none.
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    className="rounded-full cursor-pointer"
                                />
                                {dropdownOpen && (
                                    <div className="absolute right-0 w-48 bg-white shadow-lg rounded-lg py-2 mt-2">
                                        <Link href="http://localhost:3000/account/123" className="block px-4 py-2 text-black hover:bg-gray-200">Profile</Link>
                                        <Link href="http://localhost:3000/account/123/listings" className="block px-4 py-2 text-black hover:bg-gray-200">My Reviews/Documents</Link>
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
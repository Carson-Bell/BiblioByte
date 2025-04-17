'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        router.push(`/search?term=${encodeURIComponent(searchTerm)}`);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-zinc-600 shadow-md z-40 p-2 sm:p-4 flex items-center justify-between" style={{ backgroundColor: 'rgba(11,79,74,1)' }}>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                    <Image
                        src="https://www.clker.com/cliparts/o/Y/Q/2/s/1/white-book-reading.svg"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="sm:w-10 sm:h-10"
                    />
                    <span className="text-lg sm:text-2xl font-semibold text-white">BiblioByte</span>
                </Link>

                {/* Search Bar */}
                <div className="ml-4 flex-grow max-w-md mr-2">
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
                        />
                    </form>
                </div>


                                {dropdownOpen && (
                                    <div className="absolute right-0 w-48 bg-white shadow-lg rounded-lg py-2 mt-2">
                                        <Link href="http://localhost:3000/account/123" className="block px-4 py-2 text-black hover:bg-gray-200">Profile</Link>
                                        <Link href="http://localhost:3000/account/123/list" className="block px-4 py-2 text-black hover:bg-gray-200">My List</Link>
                                        <Link href="http://localhost:3000/account/123/listings" className="block px-4 py-2 text-black hover:bg-gray-200">My Reviews/Documents</Link>
                                        <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-black hover:bg-gray-200">Sign Out</button>
                                    </div>
                                )}
                            </div>
                        </>

                    ) : (
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

            {/* Modals */}
            <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
            <SignupModal show={showSignup} onClose={() => setShowSignup(false)} />
        </>
    );
}
'use client';
import React, {useState} from "react";
import Image from "next/image";
import LoginModal from "./LoginModal"
import SignupModal from "./SignupModal"

export default function NavbarUnauth() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-zinc-600 shadow-md z-40 p-4 flex items-center">
                <div className="flex items-center gap-2">
                    <Image
                        src="https://www.clker.com/cliparts/o/Y/Q/2/s/1/white-book-reading.svg" // Replace with the path to your image
                        alt="Logo"
                        width={50}
                        height={50}
                    />
                    <a href="#home" className="text-3xl font-semibold hover:font-bold text-white">
                        BiblioByte
                    </a>
                </div>
                <div className="ml-8 flex-auto">
                    <input
                        type="text"
                        placeholder="Search for book"
                        className="w-xs px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
                    />
                </div>
                <div className="ml-auto flex gap-4">
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
                </div>
            </header>

            <LoginModal show={showLogin} onClose={() => setShowLogin(false)}/>;
            <SignupModal show={showSignup} onClose={() => setShowSignup(false)}/>
        </>
    );
}
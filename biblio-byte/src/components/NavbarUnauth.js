"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

export default function NavbarUnauth() {
    const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
    const router = useRouter(); // Initialize the router

    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        if (searchQuery.trim()) {
            router.push('/search'); // Navigate to /search with the query
        };
    }
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value); // Update the search query state
    };
    return (
        <header className="fixed top-0 left-0 w-full bg-teal-900 shadow-md z-40 p-4 flex items-center">
            <div className="flex items-center gap-2">
                <Image
                    src="https://www.clker.com/cliparts/o/Y/Q/2/s/1/white-book-reading.svg" // Replace with the path to your image
                    alt="Logo"
                    width={50}
                    height={50}
                />
                <a href="/" className="text-3xl font-semibold hover:font-bold text-white">
                    BiblioByte
                </a>
            </div>
            <form onSubmit={handleSearchSubmit} className="ml-8 flex-auto">
                <input
                    type="text"
                    placeholder="Search for book"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                    className="w-xs px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
                />
            </form>
            <div className="ml-auto flex gap-4">
                <button
                    className="px-4 py-2 bg-zinc-300 text-black rounded-md hover:bg-zinc-900 hover:text-white focus:outline-none"
                >
                    Login
                </button>
                <button
                    className="px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-300 hover:text-black focus:outline-none"
                >
                    Sign Up
                </button>
            </div>
        </header>
    );
}
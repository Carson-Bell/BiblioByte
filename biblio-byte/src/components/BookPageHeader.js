'use client';
//TEST CHANGE FROM BRIANNA
import React, { useState, useEffect } from "react";

export default function BookPageHeader() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Set mobile breakpoint
        };

        // Initial check
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <nav className={`w-full text-white py-2 px-4 fixed z-30 shadow-lg ${
                    isMobile ? "top-[54px]" : "top-[68px]"
                }`}
                style={{
                    backgroundColor: 'oklch(27.7% 0.046 192.524)',
                    border: '2-x solid transparent',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 1)'
            }}>
                <ul className="list-none grid grid-cols-3 gap-3 text-center">
                    <li>
                        <a href="#info" className="hover:underline">
                            Info
                        </a>
                    </li>
                    <li>
                        <a href="#reviews" className="hover:underline">
                            Reviews
                        </a>
                    </li>
                    <li>
                        <a href="#finds" className="hover:underline">
                            Find
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="w-full h-1 bg-white shadow-md"></div>
        </>
    );
}
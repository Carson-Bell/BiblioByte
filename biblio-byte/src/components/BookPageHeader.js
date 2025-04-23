'use client';
//TEST CHANGE FROM BRIANNA
import React from "react";

export default function BookPageHeader() {
    return (
        <>
            <nav className="w-full text-white py-2 px-4 fixed top-[68px] z-30 shadow-lg"
                style={{
                backgroundColor: 'oklch(27.7% 0.046 192.524)',
                border: '2px solid transparent',
                boxShadow: '0 0 10px rgba(0, 0, 0, 1)'  // Creates a blurry effect around the border
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
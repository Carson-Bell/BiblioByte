'use client';
//TEST CHANGE FROM BRIANNA
import React from "react";

export default function BookPageHeader() {
    return (
        <>
            <nav className="w-full text-white py-2 px-4 fixed top-[64px] z-30 shadow-md"
             style={{ backgroundColor: 'rgba(11,79,74,1)'}}>
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
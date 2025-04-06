'use client';
//TEST CHANGE FROM BRIANNA
import React from "react";

export default function BookPageHeader() {
    return (
        <>
            <nav className="w-full bg-zinc-400 text-white py-2 px-4 fixed top-[64px] z-30 shadow-md">
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
                        <a href="#" className="hover:underline">
                            Find
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="w-full h-1 bg-white shadow-md"></div>
        </>
    );
}
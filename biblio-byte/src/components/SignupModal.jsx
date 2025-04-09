'use client';

import {useEffect} from 'react';

export default function SignupModal({show, onClose}) {
    useEffect(() => {
        // lock body scroll
        if (show) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, [show]);

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-md shadow-lg min-w-[300px] relative"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-semibold mb-4 text-black">Signup</h2>
                <form
                    className="flex flex-col gap-3"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const name = e.target.name.value;
                        const email = e.target.email.value;
                        const password = e.target.password.value;

                        const res = await fetch('/api/signup', {
                            method: 'POST',
                            body: JSON.stringify({name, email, password}),
                        });

                        if (res.ok) {
                            alert('Signup successful');
                            onClose();
                        } else {
                            alert('Signup failed');
                        }
                    }}
                >
                    <div>
                        <label className="text-black">Name</label>
                        <input
                            name="name"
                            type="text"
                            className="w-full border px-2 py-1 rounded text-black"
                        />
                    </div>
                    <div>
                        <label className="text-black">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="w-full border px-2 py-1 rounded text-black"
                        />
                    </div>
                    <div>
                        <label className="text-black">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="w-full border px-2 py-1 rounded text-black"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                    >
                        Submit
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                    ✕ 
                </button>
            </div>
        </div>
    );
}
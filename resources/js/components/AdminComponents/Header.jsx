import React from "react";
import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

function Header() {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <>
            {/* FIX: Added 'z-50' to ensure Header and Dropdown stay ABOVE the Table/Content */}
            <header className="dark:bg-slate-950 dark:border-b dark:border-gray-700 font-poppins bg-white shadow-sm sticky top-0 z-50">
                <div className="flex items-center justify-between px-4 h-16">
                    <div className="flex items-center">
                        <h1 className="text-2xl pl-3 font-bold text-gray-800 dark:text-gray-300">
                            Dash<span className="text-red-500">board</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="hidden sm:block text-sm text-gray-600 dark:text-gray-300">
                            As {user.role}
                        </span>

                        {/* Profile Icon */}
                        <div
                            title="Click to Open"
                            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                            className="w-10 h-10 hover:cursor-pointer rounded-full bg-slate-500 flex items-center justify-center text-white font-semibold select-none"
                        >
                            {user.name
                                ? user.name.substring(0, 2).toUpperCase()
                                : "U"}
                        </div>
                    </div>
                </div>

                {/* Dropdown Menu */}
                {/* We use relative positioning here so the absolute menu stays near the header if needed, 
                    but since you use fixed 'right-4 top-16', the z-50 on header fixes the click issue. */}
                <div className="">
                    {profileMenuOpen && (
                        <>
                            {/* Optional: Invisible backdrop to close menu when clicking outside */}
                            <div
                                className="fixed inset-0 z-[9998]"
                                onClick={() => setProfileMenuOpen(false)}
                            ></div>

                            <div className="absolute border border-gray-200 dark:border-gray-600 right-4 top-16 bg-white dark:bg-gray-800 shadow-xl rounded-md w-48 py-2 z-[9999]">
                                <Link
                                    href="/"
                                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 transition-colors"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button" // best practice for logout links
                                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
                                >
                                    Log Out
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </header>
        </>
    );
}

export default Header;

import React from "react";
import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

function Header() {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const { auth } = usePage().props;
    const user = auth?.user;
    return (
        <>
            <header className="dark:bg-slate-950 dark:border-b dark:border-gray-700 font-poppins bg-white shadow-sm sticky top-0">
                <div className="flex items-center justify-between px-4 h-16">
                    <div className="flex items-center">
                        <h1 className="text-2xl pl-3 font-bold text-gray-800 dark:text-gray-300">
                            Dash<span className="text-red-500">board</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="hidden sm:block   text-sm text-gray-600 dark:text-gray-300">
                            As {user.role}
                        </span>
                        <div
                            title="Click to Open"
                            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                            className="w-10 h-10 hover:cursor-pointer rounded-full bg-slate-500 flex items-center justify-center text-white font-semibold"
                        >
                            BB
                        </div>
                    </div>
                </div>

                <div className="card ">
                    {profileMenuOpen && (
                        <div className="absolute border border-gray-400  right-4 top-16 bg-white dark:bg-gray-800 shadow-lg rounded-md w-48 py-2 z-[9999]">
                            <Link
                                href="/"
                                className="block px-4 py-2  hover:text-blue-500 hover:cursor-pointer  "
                            >
                                Home
                            </Link>
                            <Link
                                href="/logout"
                                method="post"
                                className="block px-4 text-red-400 hover:text-red-600 hover:cursor-pointer  "
                            >
                                Log Out
                            </Link>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
}

export default Header;

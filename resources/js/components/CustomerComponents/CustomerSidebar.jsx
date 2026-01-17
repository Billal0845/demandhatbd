import React from "react";
import { Link, usePage } from "@inertiajs/react";
export default function Sidebar({ isOpen, onClose }) {
    const { url } = usePage();
    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-200 ${
                    isOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible pointer-events-none"
                }`}
                onClick={onClose}
            />
            {/* Drawer */}
            <aside
                className={`fixed top-0 left-0 h-full  w-40 lg:w-50 bg-white dark:bg-[#1F2937] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-[#374151]">
                    <span className="text-xl font-bold tracking-wide text-black dark:text-white">
                        SURA
                        <span className="text-[#7CA66E] dark:text-[#8FBA81]">
                            BIL
                        </span>
                    </span>
                    <button
                        onClick={onClose}
                        className="text-gray-500 dark:text-[#D1D5DB] hover:text-[#658C58] dark:hover:text-[#7CA66E] transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <nav className="flex flex-col  p-4 space-y-2">
                    <SidebarLink
                        href="/"
                        active={url === "/"}
                        onClick={onClose}
                    >
                        Home
                    </SidebarLink>
                    <SidebarLink
                        href="/offers"
                        active={url.startsWith("/offers")}
                        onClick={onClose}
                    >
                        Offers
                    </SidebarLink>
                    <SidebarLink
                        href="/categories"
                        active={url.startsWith("/categories")}
                        onClick={onClose}
                    >
                        Categories
                    </SidebarLink>
                </nav>
            </aside>
        </>
    );
}
// Helper component for cleaner links
function SidebarLink({ href, active, children, onClick }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                active
                    ? "bg-[#E8F5E3] text-[#658C58] dark:bg-[#374151] dark:text-[#8FBA81]"
                    : "text-gray-700 dark:text-[#D1D5DB] hover:bg-gray-100 dark:hover:bg-[#374151]"
            }`}
        >
            {children}
        </Link>
    );
}

import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    FiX,
    FiHome,
    FiTag,
    FiGrid,
    FiBox,
    FiInfo,
    FiMessageSquare,
} from "react-icons/fi";

export default function Sidebar({ isOpen, onClose }) {
    const { url } = usePage();

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible pointer-events-none"
                }`}
                onClick={onClose}
            />
            {/* Drawer */}
            <aside
                className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-[#1F2937] shadow-2xl z-[70] transform transition-transform duration-300 ease-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="h-20 flex items-center justify-between px-6 border-b dark:border-gray-700">
                    <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        DEMAND<span className="text-[#658C58]">HAT</span>
                    </span>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        <FiX size={24} className="text-gray-500" />
                    </button>
                </div>

                <nav className="p-4 space-y-1">
                    <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Main Menu
                    </p>
                    <SidebarLink
                        href="/"
                        active={url === "/"}
                        onClick={onClose}
                        icon={<FiHome />}
                    >
                        Home
                    </SidebarLink>
                    <SidebarLink
                        href="/productspage"
                        active={url === "/productspage"}
                        onClick={onClose}
                        icon={<FiBox />}
                    >
                        Products
                    </SidebarLink>
                    <SidebarLink
                        href="/offers"
                        active={url.startsWith("/offers")}
                        onClick={onClose}
                        icon={<FiTag />}
                    >
                        Offers
                    </SidebarLink>
                    <SidebarLink
                        href="/categories"
                        active={url.startsWith("/categories")}
                        onClick={onClose}
                        icon={<FiGrid />}
                    >
                        Categories
                    </SidebarLink>

                    <div className="my-4 border-t dark:border-gray-700 pt-4">
                        <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Company
                        </p>
                        <SidebarLink
                            href="/about"
                            active={url === "/about"}
                            onClick={onClose}
                            icon={<FiInfo />}
                        >
                            About Us
                        </SidebarLink>
                        {/* <SidebarLink
                            href="/ReqProduct"
                            active={url === "/ReqProduct"}
                            onClick={onClose}
                            icon={<FiMessageSquare />}
                        >
                            Request Product
                        </SidebarLink> */}
                    </div>
                </nav>
            </aside>
        </>
    );
}

function SidebarLink({ href, active, children, onClick, icon }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                active
                    ? "bg-[#658C58] text-white shadow-md shadow-[#658C58]/30"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
        >
            <span className="text-xl">{icon}</span>
            {children}
        </Link>
    );
}

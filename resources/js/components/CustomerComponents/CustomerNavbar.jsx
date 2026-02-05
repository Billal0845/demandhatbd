import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { FiMenu } from "react-icons/fi";
import { IoPersonCircleOutline } from "react-icons/io5";
import {
    MdOutlineAddShoppingCart,
    MdPerson,
    MdPersonAddAlt,
} from "react-icons/md";
import { HiOutlineLogout, HiOutlineLogin } from "react-icons/hi";
import { BsTable } from "react-icons/bs"; // Added a table icon for orders
import SearchSection from "../../components/CustomerComponents/SearchSection";

function Navbar({ onToggleSidebar }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { auth } = usePage().props;
    const user = auth?.user;

    // Safe check using optional chaining (?.)
    const isEmployee = user?.role === "employee";
    const isAdminOrManager = user?.role === "admin" || user?.role === "manager";

    // Determine Dashboard Link & Label based on Role
    const getDashboardLink = () => {
        if (isEmployee) return "/admin/orders";
        if (isAdminOrManager) return "/admin";
        return "/dashboard"; // Customer
    };

    const getDashboardLabel = () => {
        if (isEmployee) return "Order Table";
        return "Dashboard";
    };

    return (
        <nav className="top-0 z-40 w-full bg-[#658C58] dark:bg-[#527043] shadow-md transition-colors duration-300">
            {/* Top Bar: Logo, Desktop Nav, and Icons */}
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Left: Hamburger (Mobile) + Logo */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 rounded-lg text-white hover:bg-black/10 transition"
                        aria-label="Menu"
                    >
                        <FiMenu size={24} />
                    </button>

                    <Link href="/" className="flex items-center gap-1 group">
                        <span className="text-2xl font-bold tracking-tight text-white">
                            <span className="text-[#a4e48b] group-hover:text-white transition-colors">
                                DEMAND
                            </span>
                            HAT
                        </span>
                    </Link>
                </div>

                {/* Middle: Desktop Navigation (Hidden on Mobile) */}
                <div className="hidden lg:flex items-center gap-1">
                    <NavLink href="/productspage">Products</NavLink>
                    <NavLink href="/categories">Categories</NavLink>
                    <NavLink href="/about">About</NavLink>
                    {/* <NavLink href="/ReqProduct">Request Product</NavLink> */}
                </div>

                {/* Right: Icons & Profile */}
                <div className="flex items-center gap-1 sm:gap-2">
                    <Link
                        href="/cart"
                        className="p-2.5 rounded-full text-white hover:bg-black/10 transition relative"
                    >
                        <MdOutlineAddShoppingCart size={24} />
                    </Link>

                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-transparent hover:border-white/50 transition overflow-hidden"
                        >
                            {user ? (
                                <img
                                    className="w-full h-full object-cover"
                                    src={
                                        user.avatar ||
                                        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=a4e48b&color=fff`
                                    }
                                    alt={user.name}
                                />
                            ) : (
                                <IoPersonCircleOutline
                                    size={30}
                                    className="text-white"
                                />
                            )}
                        </button>

                        {/* Profile Dropdown */}
                        {isProfileOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsProfileOpen(false)}
                                />
                                <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-[#1F2937] shadow-2xl rounded-xl py-2 z-50 border border-gray-100 dark:border-gray-700">
                                    {user ? (
                                        <>
                                            <div className="px-4 py-3 border-b dark:border-gray-700">
                                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {user.email}
                                                </p>
                                            </div>

                                            {/* DYNAMIC DASHBOARD LINK */}
                                            <DropdownLink
                                                href={getDashboardLink()}
                                                icon={
                                                    isEmployee ? (
                                                        <BsTable size={18} />
                                                    ) : (
                                                        <MdPerson size={18} />
                                                    )
                                                }
                                            >
                                                {getDashboardLabel()}
                                            </DropdownLink>

                                            <div className="border-t dark:border-gray-700 my-1"></div>
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition font-medium"
                                            >
                                                <HiOutlineLogout size={18} />{" "}
                                                Log Out
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <DropdownLink
                                                href="/login"
                                                icon={
                                                    <HiOutlineLogin size={18} />
                                                }
                                            >
                                                Login
                                            </DropdownLink>
                                            <DropdownLink
                                                href="/register"
                                                icon={
                                                    <MdPersonAddAlt size={18} />
                                                }
                                            >
                                                Register
                                            </DropdownLink>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Bar: Search Section */}
            <div className="bg-[#5a7d4e] dark:bg-[#466039] py-2 px-4 shadow-inner">
                <div className="max-w-3xl mx-auto">
                    <SearchSection />
                </div>
            </div>
        </nav>
    );
}

// Sub-components
const NavLink = ({ href, children }) => (
    <Link
        href={href}
        className="px-4 py-2 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all"
    >
        {children}
    </Link>
);

const DropdownLink = ({ href, icon, children }) => (
    <Link
        href={href}
        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
        {icon} {children}
    </Link>
);

export default Navbar;

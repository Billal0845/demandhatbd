import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { FiAlignLeft } from "react-icons/fi";
import { FiAlignJustify } from "react-icons/fi";
import { LuSun, LuMoon } from "react-icons/lu";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdPerson } from "react-icons/md";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { HiOutlineLogin } from "react-icons/hi";
import { MdPersonAddAlt } from "react-icons/md";
import SearchSection from "../../components/CustomerComponents/SearchSection";

function Navbar({ onToggleSidebar, isDarkMode, toggleDarkMode }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Get auth user from shared props
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <nav className=" border-b  top-0 z-30 w-full bg-[#658C58] dark:bg-[#527043] shadow-sm dark:border-b dark:border-gray-700 transition-colors duration-300">
            <div className=" mx-auto px-4 py-2">
                <div className="flex justify-between items-center">
                    {/* Left: Hamburger + Logo */}
                    <div className="flex items-center gap-4">
                        <button
                            title="Toggle sidebar"
                            onClick={onToggleSidebar}
                            className="p-2 -ml-2 rounded-full text-white dark:text-white hover:bg-[#527043] dark:hover:bg-[#658C58] transition "
                            aria-label="Toggle sidebar"
                        >
                            <FiAlignLeft size={22} />
                        </button>

                        <Link
                            href="/"
                            className="text-2xl font-inter font-semibold tracking-tight cursor-pointer select-none text-white"
                        >
                            {/* My<span className="text-red-500">Shop</span> */}
                            <span className="text-[#78cd5b]">SURA</span>BIL
                        </Link>
                    </div>

                    {/* Middle: Navigation Links (Desktop) */}
                    <div className="hidden lg:flex font-inter text-sm font-medium tracking-wide text-white items-center gap-6">
                        <Link
                            href="/productspage"
                            className=" p-2 rounded hover:bg-black/10 dark:hover:bg-white/10
  transition"
                        >
                            Products
                        </Link>
                        <Link
                            href="/about"
                            className="  p-2 rounded hover:bg-black/10 dark:hover:bg-white/10
  transition"
                        >
                            About
                        </Link>

                        <Link
                            href="/ReqProduct"
                            className=" p-2 rounded hover:bg-black/10 dark:hover:bg-white/10
 transition"
                        >
                            Rquest Your Product
                        </Link>
                    </div>

                    {/* Right: Icons */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="lg:hidden p-2 font-semibold rounded-full text-white dark:text-white hover:bg-[#527043] dark:hover:bg-[#658C58] transition"
                            aria-label="Toggle menu"
                        >
                            <FiAlignJustify size={22} />
                        </button>
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full text-white dark:text-white hover:bg-[#527043] dark:hover:bg-[#658C58] transition"
                            title="Change Theme"
                        >
                            {isDarkMode ? (
                                <LuSun size={22} />
                            ) : (
                                <LuMoon size={22} />
                            )}
                        </button>
                        {/* Cart Icon (only show if logged in) */}
                        <Link
                            href="/cart"
                            className="relative  p-2 rounded-full hover:bg-[#527043] dark:hover:bg-[#658C58] transition text-white dark:text-white"
                            aria-label="Shopping cart"
                        >
                            <MdOutlineAddShoppingCart size={22} />
                        </Link>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="h-9 w-9 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#7CA66E] transition"
                                aria-label="Profile menu"
                            >
                                {user ? (
                                    <img
                                        className="w-full h-full object-cover"
                                        src={
                                            user.avatar ||
                                            "https://ui-avatars.com/api/?name=" +
                                                encodeURIComponent(user.name)
                                        }
                                        alt={user.name}
                                    />
                                ) : (
                                    <div className="w-full h-full text-white hover:bg-[#527043] dark:hover:bg-[#7CA66E] hover:text-white hover:cursor-pointer flex items-center justify-center">
                                        <IoPersonCircleOutline size={25} />
                                    </div>
                                )}
                            </button>

                            {/* Backdrop for Dropdown */}
                            {isProfileOpen && (
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsProfileOpen(false)}
                                ></div>
                            )}

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1F2937] shadow-xl rounded-lg py-2 z-50 border border-gray-100 dark:border-[#374151] animate-in fade-in zoom-in-95 duration-100">
                                    {user ? (
                                        // Logged In Menu
                                        <>
                                            <div className="px-4 py-3 border-b border-gray-100 dark:border-[#374151]">
                                                <p className="text-sm font-semibold text-gray-900 dark:text-[#F9FAFB] truncate">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-[#D1D5DB] truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <Link
                                                href="/dashboard"
                                                className="flex items-center font-inter gap-2 px-4 py-2 text-sm text-gray-700 dark:text-[#F9FAFB] hover:bg-[#E8F5E3] dark:hover:bg-[#374151] transition"
                                                onClick={() =>
                                                    setIsProfileOpen(false)
                                                }
                                            >
                                                <MdPerson size={20} />
                                                Dashboard
                                            </Link>
                                            <Link
                                                href="/myOrders"
                                                className="flex items-center font-inter gap-2 px-4 py-2 text-sm text-gray-700 dark:text-[#F9FAFB] hover:bg-[#E8F5E3] dark:hover:bg-[#374151] transition"
                                                onClick={() =>
                                                    setIsProfileOpen(false)
                                                }
                                            >
                                                <LiaShoppingBagSolid
                                                    size={20}
                                                />
                                                My Orders
                                            </Link>

                                            <div className="border-t font-inter  border-gray-100 dark:border-[#374151] my-1"></div>
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                                                onClick={() =>
                                                    setIsProfileOpen(false)
                                                }
                                            >
                                                <HiOutlineLogout size={20} />
                                                Log Out
                                            </Link>
                                        </>
                                    ) : (
                                        // Guest Menu
                                        <>
                                            <div className="px-4 py-3 border-b font-inter border-gray-100 dark:border-[#374151]">
                                                <p className="text-sm font-semibold text-gray-900 dark:text-[#F9FAFB]">
                                                    Welcome to MyShop
                                                </p>
                                                <p className="text-xs text-gray-500 font-inter dark:text-[#D1D5DB]">
                                                    Please login to continue
                                                </p>
                                            </div>
                                            <Link
                                                href="/login"
                                                className="flex items-center gap-2 px-4 font-inter py-2 text-sm text-gray-700 dark:text-[#F9FAFB] hover:bg-[#E8F5E3] dark:hover:bg-[#374151] transition"
                                                onClick={() =>
                                                    setIsProfileOpen(false)
                                                }
                                            >
                                                <HiOutlineLogin size={20} />
                                                Login
                                            </Link>
                                            <Link
                                                href="/register"
                                                className="flex items-center gap-2 font-inter px-4 py-2 text-sm text-gray-700 dark:text-[#F9FAFB] hover:bg-[#E8F5E3] dark:hover:bg-[#374151] transition"
                                                onClick={() =>
                                                    setIsProfileOpen(false)
                                                }
                                            >
                                                <MdPersonAddAlt size={20} />
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-2 md:mt-0 md:py-2">
                    <SearchSection />
                </div>

                {/* Mobile Menu (Products, About, Vouchers) */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden mt-4 pb-4 font-inter border-t border-gray-200 dark:border-[#374151] pt-4">
                        <Link
                            href="/productspage"
                            className="block px-4 py-2 text-sm font-medium text-white dark:text-[#F9FAFB] hover:bg-black/10 dark:hover:bg-white/10
 rounded-lg transition"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Products
                        </Link>
                        <Link
                            href="/about"
                            className="block px-4 py-2 text-sm font-medium text-white dark:text-[#F9FAFB] hover:bg-black/10 dark:hover:bg-white/10
 rounded-lg transition"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/ReqProduct"
                            className="block px-4 py-2 text-sm font-medium text-white dark:text-[#F9FAFB] hover:bg-black/10 dark:hover:bg-white/10
 rounded-lg transition"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Request Your Product
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;

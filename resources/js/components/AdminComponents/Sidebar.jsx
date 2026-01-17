import React, { useState } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { GrUserManager } from "react-icons/gr";
import { BsNewspaper } from "react-icons/bs";
import { MdSettings, MdLightMode } from "react-icons/md";
import { Link } from "@inertiajs/react";
import { ShoppingBasket, ShoppingCart } from "lucide-react";
import { TbCategory } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi";

function Sidebar({
    collapsed,
    setCollapsed,
    darkMode,
    setDarkMode,
    toggleDarkMode,
}) {
    return (
        <aside
            className={`dark:bg-slate-950 dark:text-white font-poppins sticky top-0 left-0 h-screen overflow-y-auto bg-white border-r border-gray-300 dark:border-gray-700 shadow-sm transform transition-all duration-300 z-50 flex-shrink-0
          ${collapsed ? "w-10 sm:w-12 hover:w-40" : " sm:w-40"} 
          lg:static`}
        >
            {/* Sidebar Header */}
            <div className="flex dark:text-white items-center justify-between px-2  h-16 border-b border-gray-300 dark:border-gray-700">
                {!collapsed && (
                    <h2 className="sm:text-xl text-lg dark:text-gray-300 font-bold text-gray-800">
                        SURABIL
                    </h2>
                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    {collapsed ? (
                        <GiHamburgerMenu size={20} />
                    ) : (
                        <BsArrowLeftCircleFill size={20} />
                    )}
                </button>
            </div>

            {/* Menu Items */}
            <nav className="py-2 sm:px-1 flex flex-col  hover:z-20 gap-1 group">
                {/* Dashboard - Simple Link */}
                <Link
                    href="/admin"
                    className="flex dark:text-gray-300 items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-gray-700 rounded hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors overflow-hidden"
                >
                    <span>
                        <IoHome size={20} />
                    </span>
                    <span
                        className={`transition-all duration-300 text-sm whitespace-nowrap ${
                            collapsed
                                ? "opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0"
                                : ""
                        }`}
                    >
                        Dashboard
                    </span>
                </Link>

                <Link
                    href="/admin/categories"
                    className="flex dark:text-gray-300 items-center gap-2 px-2  sm:px-3 sm:py-2 py-1.5 text-gray-700 rounded hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors overflow-hidden"
                >
                    <span>
                        <TbCategory size={20} />
                    </span>
                    <span
                        className={`transition-all text-sm duration-300 whitespace-nowrap ${
                            collapsed
                                ? "opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0"
                                : ""
                        }`}
                    >
                        Category
                    </span>
                </Link>

                <Link
                    href="/admin/products"
                    className="flex dark:text-gray-300 items-center gap-2 px-2 sm:px-3 sm:py-2 py-1.5  text-gray-700 rounded hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors overflow-hidden"
                >
                    <span>
                        <ShoppingBasket size={20} />
                    </span>
                    <span
                        className={`transition-all text-sm duration-300 whitespace-nowrap ${
                            collapsed
                                ? "opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0"
                                : ""
                        }`}
                    >
                        Products
                    </span>
                </Link>

                {/* Products - With Dropdown */}

                {/* Users - Simple Link */}
                <Link
                    href="/admin/users"
                    className="flex dark:text-gray-300 items-center gap-2 sm:px-3 px-2 sm:py-2 py-1.5 text-gray-700 rounded hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors overflow-hidden"
                >
                    <span>
                        <GrUserManager size={20} />
                    </span>
                    <span
                        className={`transition-all text-sm duration-300 whitespace-nowrap ${
                            collapsed
                                ? "opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0"
                                : ""
                        }`}
                    >
                        Users
                    </span>
                </Link>

                <Link
                    href="/admin/employees"
                    className="flex dark:text-gray-300 items-center gap-2 sm:px-3 px-2 sm:py-2 py-1.5 text-gray-700 rounded hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors overflow-hidden"
                >
                    <span>
                        <HiOutlineUserGroup size={20} />
                    </span>
                    <span
                        className={`transition-all text-sm duration-300 whitespace-nowrap ${
                            collapsed
                                ? "opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0"
                                : ""
                        }`}
                    >
                        Employees
                    </span>
                </Link>

                <Link
                    href="/admin/orders"
                    className="flex dark:text-gray-300 items-center gap-2 sm:px-3 px-2 sm:py-2 py-1.5 text-gray-700 rounded hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors overflow-hidden"
                >
                    <span>
                        <ShoppingCart size={20} />
                    </span>
                    <span
                        className={`transition-all text-sm duration-300 whitespace-nowrap ${
                            collapsed
                                ? "opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0"
                                : ""
                        }`}
                    >
                        Orders
                    </span>
                </Link>

                {/* Reports - Simple Link */}
                <Link
                    href="/admin/reports"
                    className="flex dark:text-gray-300 items-center gap-2 sm:px-3 px-2 sm:py-2 py-1.5 text-gray-700 rounded hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors overflow-hidden"
                >
                    <span>
                        <BsNewspaper size={20} />
                    </span>
                    <span
                        className={`transition-all text-sm duration-300 whitespace-nowrap ${
                            collapsed
                                ? "opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0"
                                : ""
                        }`}
                    >
                        Reports
                    </span>
                </Link>

                {/* Settings - Simple Link */}
                <Link
                    href="/admin/settings"
                    className="flex dark:text-gray-300 items-center gap-2 sm:px-3 px-2 sm:py-2 py-1.5 text-gray-700 rounded hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors overflow-hidden"
                >
                    <span>
                        <MdSettings size={20} />
                    </span>
                    <span
                        className={`transition-all text-sm duration-300 whitespace-nowrap ${
                            collapsed
                                ? "opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0"
                                : ""
                        }`}
                    >
                        Settings
                    </span>
                </Link>

                {/* Theme Toggle */}
                <button
                    onClick={() => toggleDarkMode(darkMode)}
                    className="sm:px-3 sm:py-2 px-2 py-1.5 items-center text-gray-700 rounded flex gap-2 dark:text-gray-300 duration-300 whitespace-nowrap hover:cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors overflow-hidden"
                >
                    <span>
                        <MdLightMode size={20} />
                    </span>
                    <span
                        className={`transition-all text-sm duration-300 whitespace-nowrap ${
                            collapsed
                                ? "opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0"
                                : ""
                        }`}
                    >
                        Theme
                    </span>
                </button>
            </nav>
        </aside>
    );
}

export default Sidebar;

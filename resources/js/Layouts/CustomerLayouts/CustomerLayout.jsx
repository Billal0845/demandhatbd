import React, { useState, useEffect } from "react";
import CustomerNavbar from "../../components/CustomerComponents/CustomerNavbar";
import CustomerSidebar from "../../components/CustomerComponents/CustomerSidebar";
import Footer from "../../components/CustomerComponents/Footer";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "@inertiajs/react";
import Marqueee from "@/components/CustomerComponents/Marqueee";
import SearchSection from "@/components/CustomerComponents/SearchSection";

export default function CustomerLayout({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const localTheme = localStorage.getItem("theme");
        if (localTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <div className="min-h-screen flex flex-col dark:bg-[#182216] text-gray-800 dark:text-gray-100 transition-colors duration-300 font-poppins relative">
            <CustomerSidebar
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <Marqueee />

            <CustomerNavbar
                onToggleSidebar={() => setSidebarOpen(true)}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
            />

            <Link className="float-right bottom-16 p-2 shadow-lg hover:cursor-pointer hover:scale-110  bg-[#25d366] transition-all duration-200 text-gray-200 fixed rounded-full  right-4 z-[9999999] ">
                <FaWhatsapp size={30} className="  " />
            </Link>

            {/* CHANGED: Removed max-w-7xl mx-auto to allow full width */}
            <main className="grow w-full">{children}</main>

            <Footer />
        </div>
    );
}

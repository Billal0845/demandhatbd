import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#2D3E29] dark:bg-[#0F1A0D] text-white border-t border-[#4B5563] dark:border-[#374151]">
            {/* Main Footer Content */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 lg:col-span-1">
                        <div className="mb-4">
                            <span className="text-2xl font-bold tracking-tight">
                                <span className="text-[#7CA66E] dark:text-[#8FBA81]">
                                    DEMAND
                                </span>
                                <span className="text-white">HAT</span>
                            </span>
                        </div>
                        <p className="font-hindSiliguri text-[#D1D5DB] dark:text-[#9CA3AF] text-sm mb-4 leading-relaxed">
                            আসসালামু আলাইকুম। আপনার প্রয়োজনীয় পণ্য বুঝে নিন
                            হাতের কাছে, আমরা আছি আপনাদের সাথে। টেকনাফ থেকে
                            তেতুলিয়া আমরা দিচ্ছি ক্যাশ অন ডেলিভারি। ধন্যবাদ।
                        </p>
                        <div className="flex space-x-4">
                            {/* Facebook Link Updated */}
                            <a
                                href="https://www.facebook.com/DemandHat"
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#D1D5DB] dark:text-[#9CA3AF] hover:text-[#7CA66E] dark:hover:text-[#8FBA81] transition-colors"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-[#D1D5DB] dark:text-[#9CA3AF] hover:text-[#7CA66E] dark:hover:text-[#8FBA81] transition-colors"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 border-b border-[#7CA66E] w-fit">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="/"
                                    className="text-[#D1D5DB] dark:text-[#9CA3AF] hover:text-white transition-colors text-sm"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/shop"
                                    className="text-[#D1D5DB] dark:text-[#9CA3AF] hover:text-white transition-colors text-sm"
                                >
                                    Products
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/categories"
                                    className="text-[#D1D5DB] dark:text-[#9CA3AF] hover:text-white transition-colors text-sm"
                                >
                                    Categories
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/offers"
                                    className="text-[#D1D5DB] dark:text-[#9CA3AF] hover:text-white transition-colors text-sm"
                                >
                                    Hot Deals
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/about"
                                    className="text-[#D1D5DB] dark:text-[#9CA3AF] hover:text-white transition-colors text-sm"
                                >
                                    About Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 border-b border-[#7CA66E] w-fit">
                            Trending
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-[#D1D5DB] dark:text-[#9CA3AF] hover:text-white transition-colors text-sm"
                                >
                                    Lifestyle Items
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-[#D1D5DB] dark:text-[#9CA3AF] hover:text-white transition-colors text-sm"
                                >
                                    Gadgets
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-[#D1D5DB] dark:text-[#9CA3AF] hover:text-white transition-colors text-sm"
                                >
                                    Home Appliances
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-[#D1D5DB] dark:text-[#9CA3AF] hover:text-white transition-colors text-sm"
                                >
                                    Fashion
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-[#D1D5DB] dark:text-[#9CA3AF] hover:text-white transition-colors text-sm"
                                >
                                    Daily Essentials
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 border-b border-[#7CA66E] w-fit">
                            Support
                        </h3>
                        <ul className="space-y-2 mb-4">
                            <li>
                                <a
                                    href="#"
                                    className="text-[#D1D5DB] dark:text-[#9CA3AF] hover:text-white transition-colors text-sm"
                                >
                                    Shipping Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-[#D1D5DB] dark:text-[#9CA3AF] hover:text-white transition-colors text-sm"
                                >
                                    Return & Refund
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-[#D1D5DB] dark:text-[#9CA3AF] hover:text-white transition-colors text-sm"
                                >
                                    Track Order
                                </a>
                            </li>
                        </ul>

                        {/* Contact Info */}
                        <div className="text-sm text-[#D1D5DB] dark:text-[#9CA3AF]">
                            <p className="mb-1 flex items-center">
                                📧{" "}
                                <span className="ml-2">
                                    info@demandhatbd.com
                                </span>
                            </p>
                            <p className="mb-1 flex items-center">
                                📞{" "}
                                <span className="ml-2">+88 01234-567890</span>
                            </p>
                            <p className="flex items-center">
                                🚚{" "}
                                <span className="ml-2">
                                    Cash on Delivery Available
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="border-t border-[#4B5563] dark:border-[#374151]">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold mb-1">
                                Stay Updated
                            </h3>
                            <p className="text-[#D1D5DB] dark:text-[#9CA3AF] text-sm">
                                Get the latest offers delivered to your inbox
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 bg-[#1F2937] dark:bg-[#111827] border border-[#4B5563] dark:border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#7CA66E] dark:focus:border-[#8FBA81]"
                            />
                            <button className="px-6 py-2 bg-[#658C58] dark:bg-[#7CA66E] text-white rounded-lg hover:bg-[#527043] dark:hover:bg-[#8FBA81] transition-colors font-medium">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-[#4B5563] dark:border-[#374151] bg-[#1A2618] dark:bg-[#080E07]">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="text-sm text-[#9CA3AF]">
                            <p>
                                &copy; {new Date().getFullYear()} DemandHat. All
                                rights reserved.
                            </p>
                        </div>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a
                                href="#"
                                className="text-xs text-[#9CA3AF] hover:text-white"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-xs text-[#9CA3AF] hover:text-white"
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>

                    {/* Payment & Delivery Methods */}
                    {/* <div className="mt-4 pt-4 border-t border-[#4B5563] dark:border-[#374151]">
                        <div className="flex flex-wrap items-center justify-center md:justify-between gap-4">
                            <span className="text-xs text-[#9CA3AF] uppercase tracking-widest">
                                Safe & Secure Shopping
                            </span>
                            <div className="flex items-center space-x-3 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                                <span className="text-xs font-bold border px-2 py-0.5 rounded border-[#4B5563]">
                                    BKASH
                                </span>
                                <span className="text-xs font-bold border px-2 py-0.5 rounded border-[#4B5563]">
                                    NAGAD
                                </span>
                                <span className="text-xs font-bold border px-2 py-0.5 rounded border-[#4B5563]">
                                    VISA
                                </span>
                                <span className="text-xs font-bold border px-2 py-0.5 rounded border-[#4B5563]">
                                    COD
                                </span>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;

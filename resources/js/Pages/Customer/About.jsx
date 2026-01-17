import AdminLayout from "../../Layouts/CustomerLayouts/CustomerLayout";
import React from "react";
import { FaShippingFast, FaLeaf, FaUsers } from "react-icons/fa";

function About() {
    return (
        <div className="bg-[#F5F7F4] dark:bg-[#0F1A0D] transition-colors duration-300">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#658C58] to-[#527043] dark:from-[#1F2D1B] dark:to-[#0F1A0D] text-white">
                <div className=" mx-auto px-6 py-20 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold font-poppins">
                        About <span className="text-[#7DEF7F]">SURA</span>BIL
                    </h1>
                    <p className="mt-6 max-w-3xl font-inter mx-auto text-lg text-gray-100">
                        A student-focused ecommerce platform delivering quality
                        essentials at affordable prices.
                    </p>
                </div>
            </section>

            {/* About Content */}
            <section className=" max-w-[1200px] mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold font-poppins text-gray-800 dark:text-white mb-4">
                            Who We Are
                        </h2>
                        <p className="text-gray-600 font-inter  dark:text-gray-300 leading-relaxed mb-4">
                            SURABIL is a modern ecommerce brand built for
                            students, bachelors, and smart shoppers who value
                            quality without overspending. We carefully curate
                            daily essentials, gadgets, and lifestyle products
                            that fit both your needs and your budget.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Our goal is simple: make online shopping easy,
                            reliable, and affordable for everyone.
                        </p>
                    </div>
                    <div className="bg-white font-inter dark:bg-[#1F2937] rounded-2xl shadow-lg p-8">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                            Contact Information
                        </h3>
                        <ul className="space-y-3  text-gray-600 dark:text-gray-300">
                            <li>📞 Mobile: 01867510845</li>
                            <li>📧 Email: Engliweb@gmail.com</li>
                            <li>📍 Serving customers all over Bangladesh</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-[#E8F5E3] dark:bg-[#1F2D1B] py-16">
                <div className=" mx-auto px-6">
                    <h2 className="text-3xl font-bold font-poppins text-center text-gray-800 dark:text-white mb-12">
                        Our Core Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
                        <div className="bg-white dark:bg-[#1F2937] rounded-xl p-6 shadow-md text-center">
                            <FaLeaf className="text-4xl mx-auto text-[#658C58] mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                Quality Products
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                We focus on reliable, durable, and useful
                                products that deliver real value.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-[#1F2937] rounded-xl p-6 shadow-md text-center">
                            <FaShippingFast className="text-4xl mx-auto text-[#658C58] mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                Fast Delivery
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                Quick and dependable delivery across Bangladesh
                                with trusted logistics partners.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-[#1F2937] rounded-xl p-6 shadow-md text-center">
                            <FaUsers className="text-4xl mx-auto text-[#658C58] mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                Customer First
                            </h3>
                            <p className="text-gray-600 font-inter dark:text-gray-300 text-sm">
                                We prioritize customer satisfaction with
                                transparent policies and friendly support.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className=" mx-auto px-6 py-16 text-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    Shop Smart. Live Better.
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
                    Join thousands of happy customers who trust SURA BIL for
                    affordable and quality online shopping.
                </p>
                <a
                    href="/productspage"
                    className="inline-block px-8 py-3 rounded-xl bg-[#658C58] text-white font-semibold hover:bg-[#527043] transition"
                >
                    Explore Products
                </a>
            </section>
        </div>
    );
}

About.layout = (page) => <AdminLayout children={page} />;
export default About;

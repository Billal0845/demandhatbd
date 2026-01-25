import React from "react";
import { User, Phone, Mail, MapPin } from "lucide-react";

export default function ShippingForm({ data, setData, errors }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 mb-8">
            <h2 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">
                    1
                </span>
                Shipping Details
            </h2>

            <div className="grid grid-cols-1 font-work md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <User size={18} />
                        </div>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                            placeholder="John Doe"
                        />
                    </div>
                    {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Phone size={18} />
                        </div>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                            placeholder="017xxxxxxxx"
                        />
                    </div>
                    {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.phone}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Mail size={18} />
                        </div>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Delivery Area */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Delivery Area <span className="text-red-500">*</span>
                    </label>

                    <div className="flex gap-6 pl-1">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="delivery_area"
                                value="inside_dhaka"
                                checked={data.delivery_area === "inside_dhaka"}
                                onChange={(e) =>
                                    setData("delivery_area", e.target.value)
                                }
                                className="text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Inside Dhaka
                            </span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="delivery_area"
                                value="outside_dhaka"
                                checked={data.delivery_area === "outside_dhaka"}
                                onChange={(e) =>
                                    setData("delivery_area", e.target.value)
                                }
                                className="text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Outside Dhaka
                            </span>
                        </label>
                    </div>

                    {errors.delivery_area && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.delivery_area}
                        </p>
                    )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Delivery Address
                    </label>
                    <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
                            <MapPin size={18} />
                        </div>
                        <textarea
                            rows="3"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                            placeholder="Full address (House, Road, City)"
                        ></textarea>
                    </div>
                    {errors.address && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.address}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

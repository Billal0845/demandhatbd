import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import CustomerLayout from "../../Layouts/CustomerLayouts/CustomerLayout";
import ReactPixel from "react-facebook-pixel";
import {
    CheckCircle,
    MapPin,
    Phone,
    User,
    Mail,
    CreditCard,
    Smartphone,
} from "lucide-react";

const Checkout = ({ cartItems, totals, auth }) => {
    // Initialize form with logged-in user data
    const { data, setData, post, processing, errors } = useForm({
        name: auth.user?.name || "",
        email: auth.user?.email || "",
        phone: auth.user?.phone || "",
        address: auth.user?.address || "",
        delivery_area: "",
        payment_method: "cod",
    });

    // Local state for dynamic calculation
    const [summary, setSummary] = useState({
        deliveryFee: 0,
        grandTotal: totals.grand_total || 0, // Fallback to initial total
    });

    // Add this inside your Checkout component (before return)
    // useEffect(() => {
    //     if (Object.keys(errors).length > 0) {
    //         console.error("Form Errors:", errors);
    //         // This will alert you if there is a hidden error
    //         alert(
    //             "Error: " +
    //                 (errors.error || errors.cart || JSON.stringify(errors)),
    //         );
    //     }
    // }, [errors]);

    // --- LOGIC: Delivery Fee Calculation ---
    const calculateDeliveryFee = (area, items) => {
        if (!area || !items || items.length === 0) return 0;

        // 1. Separate items by class
        // Note: Ensure your backend passes 'bussiness_class' directly in cartItems
        const highItems = items.filter(
            (item) => item.bussiness_class === "high",
        );
        const mediumItems = items.filter(
            (item) => item.bussiness_class === "medium",
        );
        const normalItems = items.filter(
            (item) => item.bussiness_class === "normal",
        );

        // Priority 1: High Class
        // Logic: Ignore others. Fee = Total High Qty * Rate
        if (highItems.length > 0) {
            const totalHighQty = highItems.reduce(
                (sum, item) => sum + item.quantity,
                0,
            );
            if (area === "inside_dhaka") return totalHighQty * 300;
            if (area === "outside_dhaka") return totalHighQty * 500;
        }

        // Priority 2: Medium Class
        // Logic: Ignore Normal. Fee = Total Medium Qty * Rate
        if (mediumItems.length > 0) {
            const totalMediumQty = mediumItems.reduce(
                (sum, item) => sum + item.quantity,
                0,
            );
            if (area === "inside_dhaka") return totalMediumQty * 150;
            if (area === "outside_dhaka") return totalMediumQty * 250;
        }

        // Priority 3: Normal Class
        // Logic: Flat rate regardless of quantity
        if (normalItems.length > 0) {
            if (area === "inside_dhaka") return 60;
            if (area === "outside_dhaka") return 120;
        }

        // Priority 4: Free Class (or default fallthrough)
        return 0;
    };

    // --- EFFECT: Update Summary when Area or Items change ---
    useEffect(() => {
        const fee = calculateDeliveryFee(data.delivery_area, cartItems);

        // Use 'totals.itemTotal' (subtotal) from props, add new fee
        // Ensure totals.itemTotal is a number. Remove commas if it's a string like "1,200"
        const subTotal =
            typeof totals.itemTotal === "string"
                ? parseFloat(totals.itemTotal.replace(/,/g, ""))
                : totals.itemTotal;

        setSummary({
            deliveryFee: fee,
            grandTotal: subTotal + fee,
        });
    }, [data.delivery_area, cartItems, totals.itemTotal]);

    // --- EFFECT: Facebook Pixel ---
    useEffect(() => {
        if (!cartItems || cartItems.length === 0) return;

        ReactPixel.track("InitiateCheckout", {
            currency: "BDT",
            value: totals.grand_total,
            num_items: cartItems.length,
            content_ids: cartItems.map((item) => item.id),
            content_type: "product",
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Optional: Validate delivery area is selected
        if (!data.delivery_area) {
            alert("Please select a delivery area.");
            return;
        }

        post("/checkout", {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Checkout" />
            <div className="py-8  mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white mb-8">
                    Checkout
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* ============================================= */}
                    {/* LEFT COLUMN: Shipping & Payment Form          */}
                    {/* ============================================= */}
                    <div className="w-full lg:w-2/3">
                        <form
                            onSubmit={handleSubmit}
                            id="checkout-form"
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8"
                        >
                            {/* --- Section 1: Shipping Details --- */}
                            <h2 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">
                                    1
                                </span>
                                Shipping Details
                            </h2>

                            <div className="grid grid-cols-1 font-work md:grid-cols-2 gap-6 mb-8">
                                {/* Name Input */}
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
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
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

                                {/* Phone Input */}
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
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
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

                                {/* Email Input */}
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
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
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
                                        Delivery Area{" "}
                                        <span className="text-red-500">*</span>
                                    </label>

                                    <div className="flex gap-6 pl-1">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="delivery_area"
                                                value="inside_dhaka"
                                                checked={
                                                    data.delivery_area ===
                                                    "inside_dhaka"
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "delivery_area",
                                                        e.target.value,
                                                    )
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
                                                checked={
                                                    data.delivery_area ===
                                                    "outside_dhaka"
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "delivery_area",
                                                        e.target.value,
                                                    )
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

                                {/* Address Input */}
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
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value,
                                                )
                                            }
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

                            {/* --- Section 2: Payment Method --- */}
                            <h2 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">
                                    2
                                </span>
                                Payment Method
                            </h2>

                            <div className="space-y-4">
                                {/* Option 1: Cash on Delivery */}
                                <label
                                    className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all flex items-center gap-4 ${
                                        data.payment_method === "cod"
                                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                            : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="cod"
                                        checked={data.payment_method === "cod"}
                                        onChange={() =>
                                            setData("payment_method", "cod")
                                        }
                                        className="text-blue-600 focus:ring-blue-500 w-5 h-5"
                                    />
                                    <div className="p-2 bg-green-100 rounded-full text-green-600">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <span className="block font-bold text-gray-900 dark:text-white">
                                            Cash on Delivery
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Pay when you receive the product
                                        </span>
                                    </div>
                                </label>

                                {/* Option 2: Stripe (Card) */}
                                <label
                                    className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all flex items-center gap-4 ${
                                        data.payment_method === "stripe"
                                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                            : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="stripe"
                                        checked={
                                            data.payment_method === "stripe"
                                        }
                                        onChange={() =>
                                            setData("payment_method", "stripe")
                                        }
                                        className="text-blue-600 focus:ring-blue-500 w-5 h-5"
                                    />
                                    <div className="p-2 bg-indigo-100 rounded-full text-indigo-600">
                                        <CreditCard size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <span className="block font-bold text-gray-900 dark:text-white">
                                            Credit / Debit Card (Stripe)
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Secure online payment
                                        </span>
                                    </div>
                                </label>

                                {/* Option 3: bKash */}
                                <label
                                    className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all flex items-center gap-4 ${
                                        data.payment_method === "bkash"
                                            ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                                            : "border-gray-200 dark:border-gray-700 hover:border-pink-300"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="bkash"
                                        checked={
                                            data.payment_method === "bkash"
                                        }
                                        onChange={() =>
                                            setData("payment_method", "bkash")
                                        }
                                        className="text-pink-600 focus:ring-pink-500 w-5 h-5"
                                    />
                                    <div className="p-2 bg-pink-100 rounded-full text-pink-600">
                                        <Smartphone size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="block font-bold text-gray-900 dark:text-white">
                                                bKash
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            Pay securely with your bKash account
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </form>
                    </div>

                    {/* ============================================= */}
                    {/* RIGHT COLUMN: Order Summary                   */}
                    {/* ============================================= */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-8">
                            <h3 className="font-bold font-poppins text-lg text-gray-900 dark:text-white mb-4">
                                Order Summary
                            </h3>

                            {/* Cart Items List */}
                            <div className="max-h-60 overflow-y-auto mb-4 pr-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-600">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex font-work gap-3 mb-4"
                                    >
                                        <div className="w-12 h-12 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
                                                {item.name}
                                            </h4>
                                            <div className="flex justify-between items-start">
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Qty: {item.quantity} ×{" "}
                                                    {item.price}
                                                </p>
                                                {/* Optional: Show class badge for debug/user clarity */}
                                                <span
                                                    className={`text-[10px] px-1.5 py-0.5 rounded uppercase ${
                                                        item.bussiness_class ===
                                                        "high"
                                                            ? "bg-red-100 text-red-600"
                                                            : item.bussiness_class ===
                                                                "medium"
                                                              ? "bg-orange-100 text-orange-600"
                                                              : "bg-gray-100 text-gray-600"
                                                    }`}
                                                >
                                                    {item.bussiness_class}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                                            TK{" "}
                                            {(
                                                item.price * item.quantity
                                            ).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Calculation Details */}
                            <div className="space-y-3 pb-4 border-t border-b border-gray-100 dark:border-gray-700 pt-4">
                                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        TK {totals.itemTotal?.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                                    <span>Delivery Fee</span>
                                    <span
                                        className={`font-semibold ${summary.deliveryFee === 0 ? "text-green-500" : "text-gray-900 dark:text-white"}`}
                                    >
                                        {summary.deliveryFee === 0 &&
                                        data.delivery_area
                                            ? "Free"
                                            : `TK ${summary.deliveryFee.toLocaleString()}`}
                                        {!data.delivery_area &&
                                            " (Select Area)"}
                                    </span>
                                </div>
                            </div>

                            {/* Grand Total */}
                            <div className="flex justify-between items-center py-4">
                                <span className="font-bold text-lg text-gray-900 dark:text-white">
                                    Total Amount
                                </span>
                                <span className="font-bold text-xl text-blue-600">
                                    TK {summary.grandTotal.toLocaleString()}
                                </span>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={processing}
                                className={`w-full font-bold py-3.5 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed ${
                                    data.payment_method === "bkash"
                                        ? "bg-pink-600 hover:bg-pink-700 text-white shadow-pink-600/30"
                                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30"
                                }`}
                            >
                                {processing ? (
                                    "Processing..."
                                ) : (
                                    <>
                                        {/* Text Logic */}
                                        {data.payment_method === "stripe" &&
                                            "Pay with Stripe"}
                                        {data.payment_method === "bkash" &&
                                            "Pay with bKash"}
                                        {data.payment_method === "cod" &&
                                            "Place Order"}

                                        {/* Icon Logic */}
                                        {data.payment_method === "stripe" && (
                                            <CreditCard size={18} />
                                        )}
                                        {data.payment_method === "bkash" && (
                                            <Smartphone size={18} />
                                        )}
                                        {data.payment_method === "cod" && (
                                            <CheckCircle size={18} />
                                        )}
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-center text-gray-400 mt-4">
                                By placing this order, you agree to our Terms of
                                Service and Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Checkout.layout = (page) => <CustomerLayout children={page} />;
export default Checkout;

import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import CustomerLayout from "@/Layouts/CustomerLayouts/CustomerLayout";
import { FiTrash2, FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";

const Cart = ({ cartItems = [], totals = {} }) => {
    const [processingId, setProcessingId] = useState(null);

    // Handlers
    const updateQuantity = (id, newQty) => {
        if (newQty < 1) return;
        setProcessingId(id);

        // Manual Path for Update
        router.patch(
            `/cart/update/${id}`,
            {
                quantity: newQty,
            },
            {
                preserveScroll: true,
                onFinish: () => {
                    setProcessingId(null);
                },
            }
        );
    };

    const removeItem = (id) => {
        if (!confirm("Are you sure you want to remove this item?")) return;

        // Manual Path for Delete
        router.delete(`/cart/remove/${id}`, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Shopping Cart" />

            <div className="pb-4  mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 mt-3">
                <h1 className="text-2xl font-bold font-poppins text-gray-900 dark:text-[#F9FAFB] mb-4">
                    Shopping cart{" "}
                    <span className="text-gray-500 dark:text-[#9CA3AF] text-lg font-normal">
                        ({cartItems.length} Items)
                    </span>
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 dark:bg-[#1F2937] rounded-lg">
                        <p className="text-gray-500 font-poppins dark:text-[#D1D5DB] text-xl">
                            Your cart is empty.
                        </p>
                        <Link
                            href="/"
                            className="text-[#658C58] dark:text-[#7CA66E] font-delius font-semibold hover:underline mt-2 inline-block"
                        >
                            Go Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* LEFT COLUMN: Cart Items */}
                        <div className="w-full lg:w-2/3">
                            <div className="bg-white dark:bg-[#1F2937]  shadow-sm border border-gray-100 dark:border-[#374151] overflow-hidden">
                                <div className="divide-y p-1 divide-gray-300 border-[#78c58b] border-2xl border dark:divide-[#374151]">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className={`px-2 py-1 flex flex-col  sm:grid sm:grid-cols-12 gap-4 items-center ${
                                                processingId === item.id
                                                    ? "opacity-50"
                                                    : ""
                                            }`}
                                        >
                                            {/* Product Details */}
                                            <div className="col-span-6 w-full  flex items-center gap-4">
                                                <div className="w-16 h-16 flex-shrink-0 bg-gray-100 dark:bg-[#374151] rounded-lg overflow-hidden">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold font-inter text-gray-900 dark:text-[#F9FAFB]">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm font-work text-gray-500 dark:text-[#9CA3AF]">
                                                        TK {item.price}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Total for this item */}
                                            <div className="col-span-2 w-full sm:w-auto flex justify-between sm:justify-center items-center">
                                                <span className="font-bold font-poppins text-gray-900 dark:text-[#F9FAFB]">
                                                    TK{" "}
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toLocaleString()}
                                                </span>
                                            </div>

                                            {/* Quantity */}
                                            <div className="col-span-3 w-full sm:w-auto flex justify-between sm:justify-center items-center">
                                                <div className="flex  items-center border border-gray-200 dark:border-[#374151] rounded-lg bg-white dark:bg-[#111827]">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity -
                                                                    1
                                                            )
                                                        }
                                                        className="p-2 hover:bg-gray-50 dark:hover:bg-[#374151] text-gray-600 dark:text-[#D1D5DB] transition-colors"
                                                    >
                                                        <FiMinus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-semibold text-gray-900 dark:text-[#F9FAFB]">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity +
                                                                    1
                                                            )
                                                        }
                                                        className="p-2 hover:bg-gray-50 dark:hover:bg-[#374151] text-gray-600 dark:text-[#D1D5DB] transition-colors"
                                                    >
                                                        <FiPlus size={14} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Remove Action */}
                                            <div className="col-span-1 w-full sm:w-auto flex justify-end sm:justify-center">
                                                <button
                                                    onClick={() =>
                                                        removeItem(item.id)
                                                    }
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Sidebar */}
                        <div className="w-full lg:w-1/3 flex flex-col gap-6">
                            <div className="bg-white dark:bg-[#1F2937] rounded-xl font-poppins  shadow-sm border border-[#56c13e]  p-6">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-[#F9FAFB] mb-4">
                                    Total
                                </h3>

                                <div className="space-y-3 pb-4 border-b border-gray-100 dark:border-[#374151]">
                                    <div className="flex justify-between text-gray-600 dark:text-[#D1D5DB]">
                                        <span className="font-medium">
                                            Subtotal
                                        </span>
                                        <span className="font-bold text-gray-900 dark:text-[#F9FAFB]">
                                            TK{" "}
                                            {totals.itemTotal?.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-[#D1D5DB]">
                                        <span className="font-medium">
                                            Delivery
                                        </span>
                                        <span className="font-bold text-gray-900 dark:text-[#F9FAFB]">
                                            TK{" "}
                                            {totals.delivery?.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center py-4">
                                    <span className="font-bold text-lg text-gray-900 dark:text-[#F9FAFB]">
                                        Grand Total
                                    </span>
                                    <span className="font-bold text-xl text-gray-900 dark:text-[#F9FAFB]">
                                        TK {totals.grandTotal?.toLocaleString()}
                                    </span>
                                </div>

                                <Link
                                    href="/checkout"
                                    className="w-full bg-[#658C58] hover:bg-[#527043] dark:bg-[#7CA66E] dark:hover:bg-[#8FBA81] text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 transition-all shadow-lg shadow-[#658C58]/30 dark:shadow-[#7CA66E]/30"
                                >
                                    Checkout
                                    <FiArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

Cart.layout = (page) => <CustomerLayout children={page} />;
export default Cart;

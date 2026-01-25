import React from "react";
import { CreditCard, Smartphone, CheckCircle } from "lucide-react";

export default function OrderSummary({
    cartItems,
    totals,
    summary,
    data,
    processing,
}) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
            <h3 className="font-bold font-poppins text-lg text-gray-900 dark:text-white mb-4">
                Order Summary
            </h3>

            {/* Cart Items List */}
            <div className="max-h-60 overflow-y-auto mb-4 pr-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-600">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex font-work gap-3 mb-4">
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
                                    Qty: {item.quantity} × {item.price}
                                </p>
                                <span
                                    className={`text-[10px] px-1.5 py-0.5 rounded uppercase ${
                                        item.bussiness_class === "high"
                                            ? "bg-red-100 text-red-600"
                                            : item.bussiness_class === "medium"
                                              ? "bg-orange-100 text-orange-600"
                                              : "bg-gray-100 text-gray-600"
                                    }`}
                                >
                                    {item.bussiness_class || "normal"}
                                </span>
                            </div>
                        </div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                            TK {(item.price * item.quantity).toLocaleString()}
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
                        className={`font-semibold ${
                            summary.deliveryFee === 0
                                ? "text-green-500"
                                : "text-gray-900 dark:text-white"
                        }`}
                    >
                        {summary.deliveryFee === 0 && data.delivery_area
                            ? "Free"
                            : `TK ${summary.deliveryFee.toLocaleString()}`}
                        {!data.delivery_area && " (Select Area)"}
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
                        {data.payment_method === "stripe" && "Pay with Stripe"}
                        {data.payment_method === "bkash" && "Pay with bKash"}
                        {data.payment_method === "cod" && "Place Order"}

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
                By placing this order, you agree to our Terms of Service and
                Privacy Policy.
            </p>
        </div>
    );
}

import React, { useState, useEffect } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import CustomerLayout from "@/Layouts/CustomerLayouts/CustomerLayout";
import ReactPixel from "react-facebook-pixel";

// Import new sub-components
import ShippingForm from "@/Components/Checkout/ShippingForm";
import PaymentMethod from "@/Components/Checkout/PaymentMethod";
import OrderSummary from "@/Components/Checkout/OrderSummary";

const Checkout = ({ cartItems = [], totals = {}, auth }) => {
    const [processingId, setProcessingId] = useState(null);
    // 1. Initialize form
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: auth.user?.email || "",
        phone: auth.user?.phone || "",
        address: auth.user?.address || "",
        delivery_area: "",
        payment_method: "cod",
    });

    const updateQuantity = (id, newQty) => {
        if (newQty < 1) return;
        setProcessingId(id);
        router.patch(
            `/cart/update/${id}`,
            { quantity: newQty },
            {
                preserveScroll: true,
                onFinish: () => setProcessingId(null),
            },
        );
    };

    const removeItem = (id) => {
        if (!confirm("Are you sure?")) return;
        router.delete(`/cart/remove/${id}`, { preserveScroll: true });
    };

    // 2. Local state for calculation
    const [summary, setSummary] = useState({
        deliveryFee: 0,
        grandTotal: totals.grand_total || 0,
    });

    // 3. Logic: Delivery Fee Calculation
    const calculateDeliveryFee = (area, items) => {
        if (!area || !items || items.length === 0) return 0;

        const highItems = items.filter(
            (item) => item.bussiness_class === "high",
        );
        const mediumItems = items.filter(
            (item) => item.bussiness_class === "medium",
        );
        const normalItems = items.filter(
            (item) =>
                !item.bussiness_class || item.bussiness_class === "normal",
        );

        // Priority 1: High
        if (highItems.length > 0) {
            const totalQty = highItems.reduce(
                (sum, item) => sum + item.quantity,
                0,
            );
            return area === "inside_dhaka" ? totalQty * 300 : totalQty * 500;
        }

        // Priority 2: Medium
        if (mediumItems.length > 0) {
            const totalQty = mediumItems.reduce(
                (sum, item) => sum + item.quantity,
                0,
            );
            return area === "inside_dhaka" ? totalQty * 150 : totalQty * 250;
        }

        // Priority 3: Normal (Flat rate)
        if (normalItems.length > 0) {
            return area === "inside_dhaka" ? 60 : 120;
        }

        return 0;
    };

    // 4. Effect: Update totals when Area or Cart changes
    useEffect(() => {
        // Calculate fee
        const fee = calculateDeliveryFee(data.delivery_area, cartItems);

        // Safely parse subtotal
        let subTotal = 0;
        if (totals && totals.itemTotal) {
            subTotal =
                typeof totals.itemTotal === "string"
                    ? parseFloat(totals.itemTotal.replace(/[^0-9.-]+/g, "")) // Better regex to remove non-numeric
                    : Number(totals.itemTotal);
        }

        setSummary({
            deliveryFee: fee,
            grandTotal: (subTotal || 0) + fee,
        });
    }, [data.delivery_area, cartItems, totals.itemTotal]);

    // 5. Effect: Pixel Tracking
    useEffect(() => {
        if (!cartItems || cartItems.length === 0) return;
        ReactPixel.track("InitiateCheckout", {
            currency: "BDT",
            value: totals.grand_total,
            num_items: cartItems.length,
            content_ids: cartItems.map((item) => item.id),
            content_type: "product",
        });
    }, [cartItems, totals.grand_total]);

    // 6. Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.delivery_area) {
            alert("দয়া করে ডেলিভারি এরিয়া সিলেক্ট করুন ");
            return;
        }
        post("/checkout", { preserveScroll: true });
    };

    return (
        <>
            <Head title="Checkout" />
            <div className="py-6 mx-auto px-4 max-w-[1200px]">
                <h1 className="text-2xl font-bold mb-8">Checkout</h1>

                {/* stock qunatity fail korle ei error show korbe */}
                {errors.error && (
                    <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 shadow-md animate-bounce">
                        <div className="flex items-center">
                            <svg
                                className="w-6 h-6 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="font-bold">{errors.error}</span>
                        </div>
                        <p className="text-sm font-hindSiliguri mt-1 ml-8">
                            অনুগ্রহ করে কার্ট থেকে পণ্যের পরিমাণ কমিয়ে আবার
                            চেষ্টা করুন অথবা আমাদের কল করুন।
                        </p>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* LEFT COLUMN */}
                    <div className="w-full lg:w-2/3">
                        <form id="checkout-form" onSubmit={handleSubmit}>
                            <ShippingForm
                                data={data}
                                setData={setData}
                                errors={errors}
                                deliveryFee={summary.deliveryFee} // Pass fee to show below area
                            />

                            {/* PLACE ORDER BUTTON MOVED HERE */}
                            <div className="mt-4 sm:mt-8">
                                <button
                                    type="submit"
                                    disabled={
                                        processing || cartItems.length === 0
                                    }
                                    className="w-full font-hindSiliguri bg-green-600 hover:bg-green-700 text-white font-bold sm:py-4 py-3 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {processing
                                        ? "প্রসেসিং হচ্ছে..."
                                        : "অর্ডার সম্পন্ন করুন"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="w-full lg:w-1/3">
                        <OrderSummary
                            cartItems={cartItems}
                            totals={totals}
                            summary={summary}
                            data={data}
                            updateQuantity={updateQuantity} // Pass handler
                            removeItem={removeItem} // Pass handler
                            processingId={processingId}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

Checkout.layout = (page) => <CustomerLayout children={page} />;
export default Checkout;

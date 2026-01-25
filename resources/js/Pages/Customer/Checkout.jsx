import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import CustomerLayout from "@/Layouts/CustomerLayouts/CustomerLayout";
import ReactPixel from "react-facebook-pixel";

// Import new sub-components
import ShippingForm from "@/Components/Checkout/ShippingForm";
import PaymentMethod from "@/Components/Checkout/PaymentMethod";
import OrderSummary from "@/Components/Checkout/OrderSummary";

const Checkout = ({ cartItems = [], totals = {}, auth }) => {
    // 1. Initialize form
    const { data, setData, post, processing, errors } = useForm({
        name: auth.user?.name || "",
        email: auth.user?.email || "",
        phone: auth.user?.phone || "",
        address: auth.user?.address || "",
        delivery_area: "",
        payment_method: "cod",
    });

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
        const fee = calculateDeliveryFee(data.delivery_area, cartItems);

        // Sanitize subtotal (remove commas if string)
        const subTotal =
            typeof totals.itemTotal === "string"
                ? parseFloat(totals.itemTotal.replace(/,/g, ""))
                : Number(totals.itemTotal || 0);

        setSummary({
            deliveryFee: fee,
            grandTotal: subTotal + fee,
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
            alert("Please select a delivery area.");
            return;
        }
        post("/checkout", { preserveScroll: true });
    };

    return (
        <>
            <Head title="Checkout" />
            <div className="py-6 mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
                <h1 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white mb-8">
                    Checkout
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* LEFT COLUMN: Form Container */}
                    <div className="w-full lg:w-2/3">
                        <form id="checkout-form" onSubmit={handleSubmit}>
                            {/* Section 1 */}
                            <ShippingForm
                                data={data}
                                setData={setData}
                                errors={errors}
                            />

                            {/* Section 2 */}
                            <PaymentMethod data={data} setData={setData} />
                        </form>
                    </div>

                    {/* RIGHT COLUMN: Summary */}
                    <div className="w-full lg:w-1/3">
                        <OrderSummary
                            cartItems={cartItems}
                            totals={totals}
                            summary={summary}
                            data={data}
                            processing={processing}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

Checkout.layout = (page) => <CustomerLayout children={page} />;
export default Checkout;

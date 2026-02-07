import React from "react";
import { ShoppingCart, ShoppingBag } from "lucide-react";
import { FiPhoneCall } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";

const ProductActions = ({ product, loading, onAddToCart }) => {
    const btnClass =
        "w-full py-3 flex font-hindSiliguri shadow-sm items-center px-4 gap-3 justify-center rounded-lg text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5";

    return (
        <div className="space-y-3">
            <a
                href="tel:01700000000"
                className={`${btnClass} bg-[#2563EB] hover:bg-[#1D4ED8]`}
            >
                <FiPhoneCall size={22} />{" "}
                <span className="font-semibold">কল করুন : 01700000000</span>
            </a>

            <a
                href="https://wa.me/8801800000000"
                className={`${btnClass} bg-[#658C58] hover:bg-[#20bd5b]`}
            >
                <BsWhatsapp size={22} />{" "}
                <span className="font-semibold">হোয়াটসঅ্যাপ : 01800000000</span>
            </a>

            <button
                onClick={() => onAddToCart(false)}
                disabled={product.stock <= 0 || loading}
                className={`${btnClass} ${product.stock > 0 ? "bg-[#c607c6] hover:bg-[#800080] font-bold" : "bg-gray-300 font-bold cursor-not-allowed text-gray-500"}`}
            >
                <ShoppingCart size={22} />{" "}
                {loading ? "যোগ করা হচ্ছে..." : "কার্টে যোগ করুন"}
            </button>

            <button
                onClick={() => onAddToCart(true)}
                disabled={product.stock <= 0 || loading}
                className={`${btnClass} text-lg font-bold ${product.stock > 0 ? "bg-green-600 hover:bg-green-700" : "bg-gray-200 cursor-not-allowed text-gray-400"}`}
            >
                <ShoppingBag size={22} />{" "}
                {loading ? "লোডিং হচ্ছে..." : "অর্ডার করুন"}
            </button>
        </div>
    );
};

export default ProductActions;

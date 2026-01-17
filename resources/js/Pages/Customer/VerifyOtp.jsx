import React, { useEffect } from "react";
import { useForm, Head, usePage } from "@inertiajs/react";
import CustomerLayout from "../../Layouts/CustomerLayouts/CustomerLayout";

function VerifyOtp({ email }) {
    const { errors: pageErrors } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        email: email || "",
        otp: "",
    });

    // Merge errors from page props with form errors
    const allErrors = { ...errors, ...pageErrors };

    const submit = (e) => {
        e.preventDefault();
        post("verify-otp");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <Head title="Verify Email" />
            <div className="bg-white dark:bg-slate-700 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl dark:text-gray-200 font-bold mb-6 text-center text-gray-800">
                    Verify Email
                </h2>

                <div className="mb-6 dark:text-green-500 text-center text-gray-600">
                    <p>We've sent a 6-digit code to:</p>
                    <p className="font-semibold text-blue-600">{email}</p>
                </div>

                <form onSubmit={submit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Enter OTP
                        </label>
                        <input
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength="6"
                            value={data.otp}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                setData("otp", value);
                            }}
                            className="w-full dark:text-black text-center text-2xl tracking-widest px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="------"
                        />

                        {allErrors.otp && (
                            <p className="text-red-500 text-sm mt-2 text-center">
                                {allErrors.otp}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
                    >
                        {processing ? "Verifying..." : "Verify & Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

VerifyOtp.layout = (page) => <CustomerLayout children={page} />;
export default VerifyOtp;

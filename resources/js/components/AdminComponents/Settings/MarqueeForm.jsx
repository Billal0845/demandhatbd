import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";

function MarqueeForm() {
    const { marquee } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        content: marquee?.content || "",
        position: marquee?.position || "",
        _method: "PATCH",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(`/admin/marquee/${marquee.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Marquee Text Updated Successfully");
            },
        });
    };

    return (
        <div className="bg-white dark:bg-[#1F2937] rounded-lg shadow-sm border border-gray-200 dark:border-[#374151] p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Marquee Text Settings
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Textarea */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Marquee Content
                    </label>

                    <textarea
                        value={data.content}
                        onChange={(e) => setData("content", e.target.value)}
                        rows={4}
                        className="w-full rounded-md border border-gray-300 dark:border-[#374151]
                        bg-white dark:bg-[#111827]
                        text-gray-800 dark:text-gray-100
                        focus:ring-2 focus:ring-[#658C58] focus:border-[#658C58]
                        text-sm p-3"
                        placeholder="Write marquee text here..."
                    ></textarea>

                    {errors.content && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.content}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-[#658C58] hover:bg-[#527043]
                        disabled:opacity-70 disabled:cursor-not-allowed
                        text-white px-6 py-2 rounded-md text-sm font-medium transition"
                    >
                        {processing ? "Updating..." : "Update Marquee"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default MarqueeForm;

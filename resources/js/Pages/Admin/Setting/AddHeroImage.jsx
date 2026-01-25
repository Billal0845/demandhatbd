import AdminLayout from "@/Layouts/AdminLayouts/AdminLayout";
import React from "react";
import { useForm, Head } from "@inertiajs/react";
import { toast } from "react-hot-toast";

function AddHeroImage() {
    const { data, setData, post, processing, errors, reset } = useForm({
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();

        post("/admin/hero/store", {
            forceFormData: true, // IMPORTANT for file upload
            onSuccess: () => {
                reset();
                toast.success("Hero Image Added Successfully!");
            },
        });
    };

    return (
        <>
            <Head title="Add Hero Image" />

            <div className="max-w-[1000px] mx-auto bg-white dark:bg-[#1F2937] rounded-xl shadow border border-gray-200 dark:border-[#374151] p-6 mt-8">
                <h1 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center">
                    Add Hero Image
                </h1>

                <form onSubmit={submit} className="space-y-5">
                    {/* Image Input */}
                    <div>
                        <label className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                            Hero Image{" "}
                            <span className="text-yellow-500">
                                (maximum size 4 MB)
                            </span>
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setData("image", e.target.files[0])
                            }
                            className="block p-2 w-full text-sm text-gray-900 dark:text-gray-300
                                       file:mr-4 file:py-2 file:px-4
                                       file:rounded-md file:border-0
                                       file:text-sm file:font-semibold
                                       file:bg-green-600 file:text-white
                                       hover:file:bg-green-700
                                       bg-gray-50 dark:bg-[#111827] rounded-md"
                        />

                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition disabled:opacity-50"
                    >
                        {processing ? "Uploading..." : "Save Hero Image"}
                    </button>
                </form>
            </div>
        </>
    );
}

AddHeroImage.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default AddHeroImage;

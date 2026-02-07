import React from "react";
import AdminLayout from "../../Layouts/AdminLayouts/AdminLayout";
import { useForm } from "@inertiajs/react";

function CategoryForm() {
    // Initialize useForm hook
    const { data, setData, post, processing, errors, reset, wasSuccessful } =
        useForm({
            name: "",
            photo: null,
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Inertia automatically converts this to FormData because it detects a file
        post("/admin/categories/store", {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="py-12">
            <form
                onSubmit={handleSubmit}
                className="flex font-poppins sm:w-1/2 sm:mx-auto flex-col p-2 gap-4"
            >
                <h2 className="text-xl font-bold dark:text-white">
                    Create Category
                </h2>

                {/* Category Name */}
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="name"
                        className="dark:text-gray-100 font-bold"
                    >
                        Category Name
                    </label>
                    <input
                        className="p-2 dark:text-black rounded border"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="Enter Category"
                    />
                    {errors.name && (
                        <div className="text-red-500 text-sm">
                            {errors.name}
                        </div>
                    )}
                </div>

                {/* Category Photo */}
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="photo"
                        className="dark:text-gray-100 font-bold"
                    >
                        Category Image
                    </label>
                    <input
                        className="p-2 dark:text-white"
                        type="file"
                        onChange={(e) => setData("photo", e.target.files[0])}
                    />
                    {errors.photo && (
                        <div className="text-red-500 text-sm">
                            {errors.photo}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="p-2 rounded hover:bg-green-600 bg-green-700 text-gray-200 font-bold"
                >
                    {processing ? "Saving..." : "Save Category"}
                </button>

                {wasSuccessful && (
                    <div className="text-green-500">
                        Category created successfully!
                    </div>
                )}
            </form>
        </div>
    );
}

CategoryForm.layout = (page) => (
    <AdminLayout children={page} title="Add Category" />
);

export default CategoryForm;

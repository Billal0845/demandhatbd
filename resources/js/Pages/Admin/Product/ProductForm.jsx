import AdminLayout from "@/Layouts/AdminLayouts/AdminLayout";
import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react"; // 1. Import useForm
import { FiArrowLeft, FiUploadCloud } from "react-icons/fi";

function ProductForm({ categories = [] }) {
    // 2. Setup useForm instead of useState
    const { data, setData, post, processing, errors } = useForm({
        productName: "",
        short_description: "",
        category: "",
        brand: "",
        quick_view: "",
        price: "",
        stock: "",
        color: "",
        weight: "",
        length: "",
        width: "",
        bussiness_class: "",
        productDetails: "",
        image: null, // useForm handles null correctly during submission
    });

    const [previewImage, setPreviewImage] = useState(null);

    // 3. Handle Text Inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    // 4. Handle File Upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file); // Update Inertia form data
            setPreviewImage(URL.createObjectURL(file)); // Update local preview
        }
    };

    // 5. Submit Form
    const handleSubmit = (e) => {
        e.preventDefault();

        post("/admin/products", {
            forceFormData: true, // Ensures file upload works
            onSuccess: () => {
                alert("Product saved successfully!");
                // Optionally clear image preview here
            },
            // Errors are automatically put into the 'errors' object by useForm
        });
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl  font-inter font-bold text-gray-800 dark:text-white">
                    Add New Product
                </h2>
                <Link
                    href="/admin/products"
                    className="flex items-center gap-2  font-inter  text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    <FiArrowLeft /> Back to Products
                </Link>
            </div>

            <div className="bg-white font-poppins dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Basic Information
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Product Name */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Product Name
                            </label>
                            <input
                                type="text"
                                name="productName"
                                value={data.productName}
                                onChange={handleChange}
                                className={`bg-gray-50 dark:bg-slate-900 border ${
                                    errors.productName
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                placeholder="e.g. HP 15-fd0812TU Series 1 Intel Core 5"
                            />
                            {errors.productName && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.productName}
                                </p>
                            )}
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Short Description{" "}
                                <span className="text-gray-600">
                                    (shows on landing page below name)
                                </span>
                            </label>
                            <input
                                type="text"
                                name="short_description"
                                value={data.short_description}
                                onChange={handleChange}
                                className={`bg-gray-50 dark:bg-slate-900 border ${
                                    errors.short_description
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                placeholder="HP 15-fd0812TU Series 1 Intel Core 5 120U 8GB RAM, 512GB SSD 15.6 Inch FHD Display Silver Laptop"
                            />
                            {errors.short_description && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.short_description}
                                </p>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Category
                            </label>
                            <select
                                name="category"
                                value={data.category}
                                onChange={handleChange}
                                className={`bg-gray-50 dark:bg-slate-900 border ${
                                    errors.category
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        {/* Brand */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Brand
                            </label>
                            <input
                                type="text"
                                name="brand"
                                value={data.brand}
                                onChange={handleChange}
                                className="bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="e.g. Apple"
                            />
                        </div>

                        {/* Quick View */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Quick View
                            </label>
                            <textarea
                                type="text"
                                name="quick_view"
                                rows="6"
                                cols="15"
                                value={data.quick_view}
                                onChange={handleChange}
                                className="bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="1.6GHz Quad-Core Processor, 8GB RAM, 256GB SSD"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Price ($)
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={data.price}
                                onChange={handleChange}
                                className={`bg-gray-50 dark:bg-slate-900 border ${
                                    errors.price
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                placeholder="0.00"
                            />
                            {errors.price && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.price}
                                </p>
                            )}
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Stock Quantity
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={data.stock}
                                onChange={handleChange}
                                className={`bg-gray-50 dark:bg-slate-900 border ${
                                    errors.stock
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                placeholder="0"
                            />
                            {errors.stock && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.stock}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Bussiness Class
                            </label>

                            <select
                                name="bussiness_class"
                                value={data.bussiness_class}
                                onChange={handleChange}
                                className={`bg-gray-50 dark:bg-slate-900 border ${
                                    errors.bussiness_class
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                            >
                                <option value="">Select Class</option>
                                <option value="free">Free</option>
                                <option value="normal">Normal</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>

                            {errors.bussiness_class && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.bussiness_class}
                                </p>
                            )}
                        </div>

                        {/* Dimensions & Color (Optional) */}
                        <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2 border-t dark:border-gray-800 pt-4 mt-2">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Color
                                </label>
                                <input
                                    type="text"
                                    name="color"
                                    value={data.color}
                                    onChange={handleChange}
                                    className="bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg block w-full p-2.5"
                                    placeholder="e.g Magenta"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Weight (kg)
                                </label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={data.weight}
                                    onChange={handleChange}
                                    className="bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg block w-full p-2.5"
                                    placeholder="1.3"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Length (cm)
                                </label>
                                <input
                                    type="number"
                                    name="length"
                                    value={data.length}
                                    onChange={handleChange}
                                    className="bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg block w-full p-2.5"
                                    placeholder="24"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Width (cm)
                                </label>
                                <input
                                    type="number"
                                    name="width"
                                    value={data.width}
                                    onChange={handleChange}
                                    className="bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg block w-full p-2.5"
                                    placeholder="23"
                                />
                            </div>
                        </div>

                        {/* Details */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Product Details
                            </label>
                            <textarea
                                name="productDetails"
                                rows="6"
                                value={data.productDetails}
                                onChange={handleChange}
                                className={`bg-gray-50 dark:bg-slate-900 border ${
                                    errors.productDetails
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                placeholder="Write a description..."
                            />
                            {errors.productDetails && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.productDetails}
                                </p>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Product Image
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label
                                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800 ${
                                        errors.image
                                            ? "border-red-500"
                                            : "border-gray-300 dark:border-gray-700"
                                    }`}
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        {previewImage ? (
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="h-20 object-contain"
                                            />
                                        ) : (
                                            <>
                                                <FiUploadCloud className="w-8 h-8 rounded-sm mb-2 text-gray-500 dark:text-gray-400" />
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">
                                                        Click to upload
                                                    </span>{" "}
                                                    or drag and drop
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                </label>
                            </div>
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.image}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Footer / Buttons */}
                    <div className="flex items-center justify-end gap-4 mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
                        <Link
                            href="/admin/products"
                            className="text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none border border-gray-300 dark:border-gray-600"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50"
                        >
                            {processing ? "Saving..." : "Save Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

ProductForm.layout = (page) => (
    <AdminLayout children={page} title="Add Products" />
);

export default ProductForm;

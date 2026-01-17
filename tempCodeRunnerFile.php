<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'address',
        'subtotal',
        'delivery_fee',
        'grand_total',
        'payment_method',
        'transaction_id',
        'payment_status',
        'order_status'
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected $casts = [
        'subtotal' => 'decimal:2',
        'delivery_fee' => 'decimal:2',
        'grand_total' => 'decimal:2',
    ];
}


<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * Fields users are allowed to fill from forms.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'address',
        'phone',
        'otp',
        'otp_expires_at',
        'role',
        'email_verified_at',
        'phone_verified_at',
        'remember_token',

    ];

    /**
     * Hidden fields.
     */
    protected $hidden = [
        'password',
        'remember_token',
        'otp',
    ];

    /**
     * Cast timestamps to carbon instances.
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'phone_verified_at' => 'datetime',
        'otp_expires_at' => 'datetime',
    ];

    /**
     * Dynamic role checking for multi-role systems.
     *
     * Usage: $user->hasRole('manager')
     *         $user->hasRole(['admin', 'manager'])
     */
    public function hasRole($roles): bool
    {
        if (is_array($roles)) {
            return in_array($this->role, $roles);
        }

        return $this->role === $roles;
    }
}




the Routes:


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CustomerController;
use Inertia\Inertia;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OrderController;
use App\Models\Order;

// ==========================================
// 1. PUBLIC ROUTES (Accessible by everyone)
// ==========================================
Route::get('/', [CustomerController::class, 'index'])->name('home');
Route::get('/categories', [CustomerController::class, 'showCategories']);
Route::get('/category/{id}', [CustomerController::class, 'showProductsByCategory']);
Route::get('/product/{id}', [ProductController::class, 'showDetails']);
Route::get('/productspage', [CustomerController::class, 'showProductPage']);
Route::get('/about', [CustomerController::class, 'aboutpage']);
Route::get('/ReqProduct', [CustomerController::class, 'reqProductForm']);


Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart/add', [CartController::class, 'store'])->name('cart.add');
Route::patch('/cart/update/{id}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/remove/{id}', [CartController::class, 'destroy'])->name('cart.remove');


// ==========================================
Route::middleware('guest')->group(function () {
  Route::get('/register', [CustomerController::class, 'showRegisterForm'])->name('register');
  Route::post('/register/store', [CustomerController::class, 'registerCustomer']);

  Route::get('/login', [CustomerController::class, 'showLoginForm'])->name('login');
  Route::post('/login', [CustomerController::class, 'login']);

  // OTP Routes (Usually require partial auth or guest, depends on implementation)
  Route::get('/verify-otp', [CustomerController::class, 'showVerifyForm'])->name('verification.notice');
  Route::post('/verify-otp', [CustomerController::class, 'verifyOtp'])->name('verify.otp');
});


// ==========================================
// 3. AUTHENTICATED ROUTES
// ==========================================
Route::middleware('auth')->group(callback: function () {

  // Global Logout (Any logged-in user can logout)
  Route::post('/logout', [CustomerController::class, 'logout'])->name('logout');


  Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
  Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
  Route::get('/checkout/success', [CheckoutController::class, 'success'])->name('checkout.success');
  // NEW: Stripe Callback Route
  Route::get('/checkout/stripe/callback', [CheckoutController::class, 'stripeSuccess'])->name('checkout.stripe.success');
  Route::get('/checkout/bkash/callback', [CheckoutController::class, 'bkashCallback'])->name('checkout.bkash.callback');


  // ------------------------------------------
  // A. CUSTOMER AREA (Role: customer)
  // ------------------------------------------
  Route::middleware(['role:customer'])->group(function () {

    Route::get('/dashboard', function () {
      return Inertia::render('Customer/CustomerDashboard');
    })->name('dashboard');
    Route::get('/myOrders', [CustomerController::class, 'viewOrders'])->name('customer.orders');
    Route::get('/orderedItem/{id}', [CustomerController::class, 'showOrderedItem']);
    // Add other customer routes here (e.g., /orders, /profile)
  });


  // ------------------------------------------
  // B. ADMIN AREA (Role: admin)
  // ------------------------------------------
  Route::middleware(['role:admin'])->group(function () {
    // Main Admin Dashboard
    Route::get('/admin', [AdminController::class, 'dashboard']);


    // Product Management (Resource Route)
    Route::resource('/admin/products', AdminProductController::class);
    // Category Management
    Route::prefix('admin/categories')->group(function () {
      Route::get('/', [CategoryController::class, 'getAllCategory'])->name('categories.index');
      Route::get('/create', [CategoryController::class, 'createCategory'])->name('categories.create');
      Route::post('/store', [CategoryController::class, 'storeCategory'])->name('categories.store');
      Route::get('/{id}/edit', [CategoryController::class, 'editParentCategory'])->name('categories.edit');
      Route::patch('/{id}/update', [CategoryController::class, 'updateCategory'])->name('categories.update');
      Route::delete('/{id}/delete', [CategoryController::class, 'destroyCategory'])->name('categories.delete');
    });

    Route::get('/admin/users', [AdminController::class, 'showUsers']);
    Route::get('/admin/orders', [OrderController::class, 'viewOrderTable'])->name('admin.orders');
    Route::get('/admin/customers/{id}/profile', [OrderController::class, 'viewCustomerDetails']);
    Route::get('/admin/orders/{id}/details', [OrderController::class, 'showDetails'])->name('admin.orders.details');
    Route::put('/admin/orders/{id}/update', [OrderController::class, 'update'])->name('admin.orders.status');
    Route::get('/admin/orders/export/pdf', [OrderController::class, 'exportPdf'])->name('admin.orders.export');
    Route::get('/admin/orders/{id}/invoice', [OrderController::class, 'printInvoice'])->name('admin.orders.invoice');

    Route::get('/admin/settings', [AdminController::class, 'settingPage']);
    Route::get('/admin/addHeroImage', [AdminController::class, 'showAddHeroForm']);
    Route::post('/admin/hero/store', [AdminController::class, 'heroStore']);
    Route::get('/admin/heroEdit/{id}', [AdminController::class, 'showEditHeroForm']);
    Route::patch('/admin/hero/{id}', [AdminController::class, 'heroUpdate']);
    Route::delete('/admin/hero/{id}', [AdminController::class, 'deleteHeroImage']);

  });

});





import React, { use, useEffect, useState } from "react";
import Sidebar from "../../Components/AdminComponents/Sidebar";
import Header from "../../Components/AdminComponents/Header";
import { Toaster } from "react-hot-toast";

function AdminLayout({ children }) {
    const [collapsed, setCollapsed] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        let localTheme = localStorage.getItem("theme");
        if (
            (!localTheme && localTheme === "dark") ||
            window.matchMedia("(prefers-color-scheme:dark)").matches
        ) {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <div className={darkMode ? "dark" : ""}>
            <div className="flex h-screen bg-gray-100 dark:bg-slate-900">
                {/* Sidebar */}
                {/* We pass the props as before */}
                <Sidebar
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    toggleDarkMode={toggleDarkMode}
                />

                {/* Main Content Wrapper */}
                {/* FIX 1: Add 'min-w-0'. This prevents the flex child from overflowing its parent */}
                <div className="flex-1 flex flex-col min-w-0 bg-gray-100 dark:bg-slate-900 transition-all duration-300">
                    {/* Top Navbar */}
                    <Header />

                    {/* Main Content Area */}
                    {/* FIX 2: Removed 'overflow-x-hidden'. Added 'overflow-x-auto' so the page can scroll horizontally if absolutely needed, though ideally, the table wrapper handles this. */}
                    <main className="flex-1 overflow-y-auto p-3 sm:p-6">
                        <Toaster position="top-center" reverseOrder={false} />
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;



import React, { useState } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { GrUserManager } from "react-icons/gr";
import { BsNewspaper } from "react-icons/bs";
import { MdSettings, MdLightMode } from "react-icons/md";
import { Link } from "@inertiajs/react";
import { ShoppingBasket, ShoppingCart } from "lucide-react";
import { TbCategory } from "react-icons/tb";

function Sidebar({
    collapsed,
    setCollapsed,
    darkMode,
    setDarkMode,
    toggleDarkMode,
}) {
    return (
        <aside
            className={`dark:bg-slate-950 dark:text-white font-poppins sticky top-0 left-0 h-screen overflow-y-auto bg-white border-r border-gray-300 dark:border-gray-700 shadow-sm transform transition-all duration-300 z-50 flex-shrink-0
          ${collapsed ? "w-10 sm:w-12 hover:w-40" : " sm:w-40"} 
          lg:static`}
        >
            {/* Sidebar Header */}
            <div className="flex dark:text-white items-center justify-between px-2  h-16 border-b border-gray-300 dark:border-gray-700">
                {!collapsed && (
                    <h2 className="sm:text-xl text-lg dark:text-gray-300 font-bold text-gray-800">
                        SURABIL
                    </h2>
                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    {collapsed ? (
                        <GiHamburgerMenu size={20} />
                    ) : (
                        <BsArrowLeftCircleFill size={20} />
                    )}
                </button>
            </div>

            {/* Menu Items */}
            <nav className="py-2 sm:px-1 flex flex-col  hover:z-20 gap-1 group">
                {/* Dashboard - Simple Link */}
                <Link
                    href="/admin"
                    className="flex dark:text-gray-300 items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-gray-700 rounded hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors overflow-hidden"
                >
                    <span>
                        <IoHome size={20} />
                    </span>
                    <span
                        className={`transition-all duration-300 text-sm whitespace-nowrap ${
                            collapsed
                                ? "opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0"
                                : ""
                        }`}
                    >
                        Dashboard
                    </span>
                </Link>

                <Link
                    href="/admin/categories"
                    className="flex dark:text-gray-300 items-center gap-2 px-2  sm:px-3 sm:py-2 py-1.5 text-gray-700 rounded hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors overflow-hidden"
                >
                    <span>
                        <TbCategory size={20} />
                    </span>
                    <span
                        className={`transition-all text-sm duration-300 whitespace-nowrap ${
                            collapsed
                                ? "opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0"
                                : ""
                        }`}
                    >
                        Category
                    </span>
                </Link>

                <Link
                    href="/admin/products"
                    className="flex dark:text-gray-300 items-center gap-2 px-2 sm:px-3 sm:py-2 py-1.5  text-gray-700 rounded hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors overflow-hidden"
                >
                    <span>
                        <ShoppingBasket size={20} />
                    </span>
                    <span
                        className={`transition-all text-sm duration-300 whitespace-nowrap ${
                            collapsed
                                ? "opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0"
                                : ""
                        }`}
                    >
                        Products
                    </span>
                </Link>

                {/* Products - With Dropdown */}

                {/* Users - Simple Link */}
                <Link
                    href="/admin/users"
                    className="flex dark:text-gray-300 items-center gap-2 sm:px-3 px-2 sm:py-2 py-1.5 text-gray-700 rounded hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors overflow-hidden"
                >
                    <span>
                        <GrUserManager size={20} />
                    </span>
                    <span
                        className={`transition-all text-sm duration-300 whitespace-nowrap ${
                            collapsed
                                ? "opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0"
                                : ""
                        }`}
                    >
                        Users
                    </span>
                </Link>

                <Link
                    href="/admin/orders"
                    className="flex dark:text-gray-300 items-center gap-2 sm:px-3 px-2 sm:py-2 py-1.5 text-gray-700 rounded hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors overflow-hidden"
                >
                    <span>
                        <ShoppingCart size={20} />
                    </span>
                    <span
                        className={`transition-all text-sm duration-300 whitespace-nowrap ${
                            collapsed
                                ? "opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0"
                                : ""
                        }`}
                    >
                        Orders
                    </span>
                </Link>

                {/* Reports - Simple Link */}
                <Link
                    href="/admin/reports"
                    className="flex dark:text-gray-300 items-center gap-2 sm:px-3 px-2 sm:py-2 py-1.5 text-gray-700 rounded hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors overflow-hidden"
                >
                    <span>
                        <BsNewspaper size={20} />
                    </span>
                    <span
                        className={`transition-all text-sm duration-300 whitespace-nowrap ${
                            collapsed
                                ? "opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0"
                                : ""
                        }`}
                    >
                        Reports
                    </span>
                </Link>

                {/* Settings - Simple Link */}
                <Link
                    href="/admin/settings"
                    className="flex dark:text-gray-300 items-center gap-2 sm:px-3 px-2 sm:py-2 py-1.5 text-gray-700 rounded hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors overflow-hidden"
                >
                    <span>
                        <MdSettings size={20} />
                    </span>
                    <span
                        className={`transition-all text-sm duration-300 whitespace-nowrap ${
                            collapsed
                                ? "opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0"
                                : ""
                        }`}
                    >
                        Settings
                    </span>
                </Link>

                {/* Theme Toggle */}
                <button
                    onClick={() => toggleDarkMode(darkMode)}
                    className="sm:px-3 sm:py-2 px-2 py-1.5 items-center text-gray-700 rounded flex gap-2 dark:text-gray-300 duration-300 whitespace-nowrap hover:cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors overflow-hidden"
                >
                    <span>
                        <MdLightMode size={20} />
                    </span>
                    <span
                        className={`transition-all text-sm duration-300 whitespace-nowrap ${
                            collapsed
                                ? "opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0"
                                : ""
                        }`}
                    >
                        Theme
                    </span>
                </button>
            </nav>
        </aside>
    );
}

export default Sidebar;
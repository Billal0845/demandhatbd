<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CustomerController;
use Inertia\Inertia;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\OrderController;

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

// Cart Routes
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart/add', [CartController::class, 'store'])->name('cart.add');
Route::patch('/cart/update/{id}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/remove/{id}', [CartController::class, 'destroy'])->name('cart.remove');

// ==========================================
// 2. GUEST ROUTES (Only for non-logged in users)
// ==========================================
Route::middleware('guest')->group(function () {
  Route::get('/register', [CustomerController::class, 'showRegisterForm'])->name('register');
  Route::post('/register/store', [CustomerController::class, 'registerCustomer']);

  Route::get('/login', [CustomerController::class, 'showLoginForm'])->name('login');
  Route::post('/login', [CustomerController::class, 'login']);

  // OTP Routes
  Route::get('/verify-otp', [CustomerController::class, 'showVerifyForm'])->name('verification.notice');
  Route::post('/verify-otp', [CustomerController::class, 'verifyOtp'])->name('verify.otp');
});

// ==========================================
// 3. AUTHENTICATED ROUTES
// ==========================================
Route::middleware('auth')->group(function () {

  // Global Logout
  Route::post('/logout', [CustomerController::class, 'logout'])->name('logout');

  // Checkout
  Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
  Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
  Route::get('/checkout/success', [CheckoutController::class, 'success'])->name('checkout.success');
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
  });

  // ------------------------------------------
  // B. STAFF AREA (Admin, Manager, Employee)
  // ------------------------------------------
  // Everyone who works for the company needs access to the Dashboard and basic Order Viewing
  Route::middleware(['role:admin,manager,employee'])->group(function () {

    Route::get('/admin/orders/{id}/check-fraud', [OrderController::class, 'checkFraud'])->name('admin.orders.fraud_check');

    // Main Dashboard (Controller should adjust view based on role if needed)
    Route::get('/admin', [AdminController::class, 'dashboard']);

    // Orders: Viewing, Details, Updating Status, Printing
    // Note: Controller logic filters *which* orders Employees see vs Admins
    Route::get('/admin/orders', [OrderController::class, 'viewOrderTable'])->name('admin.orders');
    Route::get('/admin/orders/{id}/details', [OrderController::class, 'showDetails'])->name('admin.orders.details');
    Route::put('/admin/orders/{id}/update', [OrderController::class, 'update'])->name('admin.orders.status'); // Employees need this to confirm orders
    Route::get('/admin/orders/export/pdf', [OrderController::class, 'exportPdf'])->name('admin.orders.export');
    Route::get('/admin/orders/{id}/invoice', [OrderController::class, 'printInvoice'])->name('admin.orders.invoice');

    // Customer Profile View (Needed to see customer info in order details)
    Route::get('/admin/customers/{id}/profile', [OrderController::class, 'viewCustomerDetails']);
  });

  // ------------------------------------------
  // C. MANAGEMENT AREA (Admin, Manager)
  // ------------------------------------------
  // Employees cannot access these (Assigning, Products, Categories)
  Route::middleware(['role:admin,manager'])->group(function () {


    // Batch Assign Orders (The Manager feature)
    Route::post('/admin/orders/assign-batch', [OrderController::class, 'assignBatch'])->name('admin.orders.assign_batch');

    // Product Management
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

    // Hero Images
    Route::get('/admin/addHeroImage', [AdminController::class, 'showAddHeroForm']);
    Route::post('/admin/hero/store', [AdminController::class, 'heroStore']);
    Route::get('/admin/heroEdit/{id}', [AdminController::class, 'showEditHeroForm']);
    Route::patch('/admin/hero/{id}', [AdminController::class, 'heroUpdate']);
    Route::delete('/admin/hero/{id}', [AdminController::class, 'deleteHeroImage']);


    Route::get('/admin/addSections', [AdminController::class, 'sectionForm']);
    Route::post('/admin/section/store', [AdminController::class, 'sectionStore']);
    Route::get('/admin/sectionEdit/{id}', [AdminController::class, 'sectionEdit']);
    Route::patch('/admin/section/{id}', [AdminController::class, 'sectionUpdate']);
    Route::delete('/admin/sectionDelete/{id}', [AdminController::class, 'sectionDelete']);

    Route::patch('/admin/marquee/{id}', [AdminController::class, 'updateMarquee']);



    Route::get('/admin/employees', [EmployeeController::class, 'showEmployees']);
    Route::get('/admin/employee/create', [EmployeeController::class, 'showAddEmployeeForm']);
    Route::post('/admin/employee/store', [EmployeeController::class, 'store'])->name('admin.employees.store');


    // Optional: Delete logic
  });

  // ------------------------------------------
  // D. SUPER ADMIN AREA (Admin Only)
  // ------------------------------------------
  // Critical system settings
  Route::middleware(['role:admin'])->group(function () {
    Route::get('/admin/users', [AdminController::class, 'showUsers']);
    Route::delete('/admin/employees/{id}', [EmployeeController::class, 'destroy'])->name('admin.employees.delete');
    Route::get('/admin/settings', [AdminController::class, 'settingPage']);
  });

});
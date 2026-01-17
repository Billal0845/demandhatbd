<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\OtpMail;
use App\Models\Category;
use App\Models\HeroImage;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;

class CustomerController extends Controller
{
    public function index()
    {
        $products = Product::all();
        $categories = Category::all();
        $heroes = HeroImage::all();
        return inertia('Customer/LandingPage', [
            'products' => $products,
            'categories' => $categories,
            'heroes' => $heroes,
        ]);
    }

    public function aboutpage()
    {
        return inertia('Customer/About');
    }

    public function reqProductForm()
    {
        return inertia('Customer/RequestForm');
    }


    public function showCategories()
    {
        $categories = Category::all();

        return inertia('Customer/Categories', ['categories' => $categories]);
    }

    // public function showProductsByCategory($id)
    // {

    //     $products = Product::where('category_id', $id)->paginate(20);

    //     $category = Category::find($id);
    //     $name = $category->name;
    //     return inertia('Customer/ProductWithCategory', ['products' => $products, 'name' => $name]);
    // }

    public function showProductsByCategory(Request $request, $id)
    {
        // 1. Start the query with the category filter
        $query = Product::where('category_id', $id);

        // 2. Apply Price Filters (if present in URL)
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // 3. Apply Sorting
        $sort = $request->input('sort', 'default'); // Default to 'default' if not sent

        switch ($sort) {
            case 'date_desc': // Newest First
                $query->orderBy('created_at', 'desc');
                break;
            case 'date_asc': // Oldest First
                $query->orderBy('created_at', 'asc');
                break;
            case 'name_asc': // Name A to Z
                $query->orderBy('name', 'asc');
                break;
            case 'name_desc': // Name Z to A
                $query->orderBy('name', 'desc');
                break;
            case 'price_desc': // Price High to Low
                $query->orderBy('price', 'desc');
                break;
            case 'price_asc': // Price Low to High
                $query->orderBy('price', 'asc');
                break;
            default: // Default
                $query->orderBy('id', 'desc');
                break;
        }

        // 4. Fetch Results with Pagination
        // withQueryString() ensures filters stay in the URL when you click "Next Page"
        $products = $query->paginate(20)->withQueryString();

        // 5. Get Category Name
        $category = Category::find($id);
        $name = $category ? $category->name : 'Category';

        return inertia('Customer/ProductWithCategory', [
            'products' => $products,
            'name' => $name
        ]);
    }


    public function showProductPage()
    {
        $products = Product::all();
        return inertia('Customer/ProductPage', [
            'products' => $products,
        ]);
    }

    public function showRegisterForm()
    {
        return inertia('AuthPages/Register');
    }
    public function showLoginForm()
    {
        return inertia('AuthPages/Login');
    }


    public function registerCustomer(Request $request)
    {
        // 1. Validation with your specific Regex
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'address' => 'required|string|max:500',
            'phone' => ['required', 'string', 'regex:/^(013|014|015|016|017|018|019)[0-9]{8}$/', 'unique:users'],
        ]);

        // 2. Generate OTP
        $otp = rand(100000, 999999);

        // 3. Create User
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'address' => $validated['address'],
            'phone' => $validated['phone'],
            'role' => 'customer', // Default role
            'otp' => $otp,
            'otp_expires_at' => Carbon::now()->addMinutes(10), // Expires in 10 mins
        ]);

        // 4. Send Email
        try {
            Mail::to($user->email)->send(new OtpMail($otp, $user->name));
        } catch (\Exception $e) {
            // Log error: \Log::error($e->getMessage());
        }

        // 5. Redirect to OTP page with email in session
        return redirect()->route('verification.notice')->with('email', $user->email);
    }

    // ================= OTP FLOW =================

    public function showVerifyForm()
    {
        $email = session('email');

        // If user tries to access this page directly without registering/login first
        if (!$email) {
            return redirect('/login');
        }

        return Inertia::render('Customer/VerifyOtp', [
            'email' => $email
        ]);
    }

    // public function verifyOtp(Request $request)
    // {
    //     $request->validate([
    //         'email' => 'required|email|exists:users,email',
    //         'otp' => 'required|numeric|digits:6',
    //     ]);

    //     $user = User::where('email', $request->email)->first();

    //     // Check 1: OTP Logic
    //     if (!$user || $user->otp != $request->otp) {
    //         return back()->withErrors(['otp' => 'Invalid OTP provided.']);
    //     }

    //     // Check 2: Expiration
    //     // if (Carbon::now()->greaterThan($user->otp_expires_at)) {
    //     //     return back()->withErrors(['otp' => 'OTP has expired. Please login to request a new one.']);
    //     // }

    //     if (!$user->otp_expires_at || Carbon::now()->greaterThan($user->otp_expires_at)) {
    //         return back()->withErrors(['otp' => 'OTP has expired. Please login to request a new one.']);
    //     }

    //     // Success: Verify both Email , Clear OTP
    //     $user->update([
    //         'email_verified_at' => Carbon::now(),
    //         'otp' => null,
    //         'otp_expires_at' => null,
    //     ]);

    //     // Login the user
    //     Auth::login($user);
    //     $this->moveCartToDatabase($user->id); //added while doing cart functionality
    //     $request->session()->regenerate();

    //     return redirect('/dashboard');
    // }

    // ================= LOGIN FLOW =================



    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|numeric|digits:6',
        ]);

        $user = User::where('email', $request->email)->first();

        // Check 1: OTP Logic
        if (!$user || $user->otp != $request->otp) {
            return Inertia::render('Customer/VerifyOtp', [
                'email' => $request->email,
                'errors' => ['otp' => 'Invalid OTP | Email is not genuine.']
            ]);
        }

        // Check 2: Expiration
        if (!$user->otp_expires_at || Carbon::now()->greaterThan($user->otp_expires_at)) {
            return Inertia::render('Customer/VerifyOtp', [
                'email' => $request->email,
                'errors' => ['otp' => 'OTP has expired. Please login to request a new one.']
            ]);
        }

        // Success logic...
        $user->update([
            'email_verified_at' => Carbon::now(),
            'otp' => null,
            'otp_expires_at' => null,
        ]);

        Auth::login($user);
        $this->moveCartToDatabase($user->id);
        $request->session()->regenerate();

        return redirect('/dashboard');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Check "remember me" checkbox
        $remember = $request->boolean('remember');

        if (Auth::attempt($credentials, $remember)) {
            $request->session()->regenerate();

            $user = Auth::user();

            // Check if Verified
            if ($user->email_verified_at === null) {
                // User is not verified: Logout, Generate NEW OTP, Redirect
                Auth::logout();

                $otp = rand(100000, 999999);

                $user->update([
                    'otp' => $otp,
                    'otp_expires_at' => Carbon::now()->addMinutes(10)
                ]);

                try {
                    Mail::to($user->email)->send(new OtpMail($otp, $user->name));
                } catch (\Exception $e) {
                }

                return redirect()->route('verification.notice')
                    ->with('email', $user->email)
                    ->withErrors(['email' => 'Your email is not verified. A new OTP has been sent.']);
            }

            $this->moveCartToDatabase($user->id); //added while doing cart functionality

            return redirect('/dashboard');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }


    // Helper to move session cart to database
    protected function moveCartToDatabase($userId)
    {
        $sessionCart = session()->get('cart', []);

        if (!empty($sessionCart)) {
            foreach ($sessionCart as $productId => $quantity) {
                // Check if item already exists in DB for this user
                $dbItem = \App\Models\Cart::where('user_id', $userId)
                    ->where('product_id', $productId)
                    ->first();

                if ($dbItem) {
                    // Update quantity
                    $dbItem->quantity += $quantity;
                    $dbItem->save();
                } else {
                    // Create new
                    \App\Models\Cart::create([
                        'user_id' => $userId,
                        'product_id' => $productId,
                        'quantity' => $quantity
                    ]);
                }
            }
            // Clear session cart
            session()->forget('cart');
        }
    }


    public function viewOrders()
    {
        if (!Auth::check()) {
            return redirect('/login'); // or handle guest user
        }

        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)->get();
        return inertia('Customer/CustomerOrders', [
            'orders' => $orders,
        ]);
    }


    public function showOrderedItem($id)
    {
        if (!Auth::check()) {
            return redirect('/login'); // or handle guest user
        }

        $order = Order::with('items.product')
            ->where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        return Inertia::render('Customer/OrderDetails', [
            'order' => $order
        ]);


    }




}

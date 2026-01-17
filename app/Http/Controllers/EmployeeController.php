<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;



class EmployeeController extends Controller
{
    public function showEmployees()
    {
        $employees = User::whereIn('role', ['manager', 'employee'])
            // This adds a 'assigned_orders_count' attribute to each user
            ->withCount([
                'assignedOrders' => function ($query) {
                    $query->where('order_status', 'pending');
                }
            ])
            ->latest()
            ->paginate(30);

        return inertia('Admin/Employee/Employees', ['employees' => $employees]);
    }

    public function showAddEmployeeForm()
    {
        return Inertia::render('Admin/Employee/AddEmployeeForm');
    }

    public function store(Request $request)
    {
        // 1. Validation
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => ['required', 'string', 'regex:/^(013|014|015|016|017|018|019)[0-9]{8}$/', 'unique:users'],
            'password' => 'required|string|min:8',
            'address' => 'required|string|max:500',
            // Ensure only these two roles can be created here
            'role' => 'required|in:manager,employee',
        ]);

        // 2. Create User (Auto Verified)
        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],

            // AUTOMATICALLY VERIFY THEM so they don't need OTP
            'email_verified_at' => Carbon::now(),
            'phone_verified_at' => Carbon::now(), // Optional if you track this
        ]);

        return redirect()->to('/admin/employees')
            ->with('success', 'New staff member created successfully.');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        // Prevent deleting yourself
        if ($user->id === Auth::id()) {
            return back()->with('error', 'You cannot delete yourself.');
        }

        $user->delete();
        return back()->with('success', 'Employee removed.');
    }
}
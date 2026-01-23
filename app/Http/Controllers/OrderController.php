<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;

use Illuminate\Http\Request;
use App\Models\Order;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;


class OrderController extends Controller
{

    public function checkFraud($id)
    {
        $order = Order::findOrFail($id);

        // Clean the phone number (remove spaces, - etc) if necessary
        $phone = $order->phone;

        // Call the BD Courier API
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('BD_COURIER_API_KEY'),
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ])->post('https://api.bdcourier.com/courier-check', [
                    'phone' => $phone
                ]);

        // Return the data to React
        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Failed to connect to fraud database',
            'details' => $response->body()
        ], 500);
    }




    public function viewOrderTable(Request $request)
    {
        // 1. Start the query with relationships
        $query = Order::query()->with(['user', 'assignee', 'authorizer']);

        // 2. Search Filter (Wrapped in a nested closure to group OR conditions)
        // IMPORTANT: Without the nested closure, OR logic can break other AND filters
        $query->when($request->search, function ($q, $search) {
            $q->where(function ($subQ) use ($search) {
                $subQ->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('id', 'like', "%{$search}%");
            });
        });

        // 3. Order Status Filter
        $query->when($request->order_status, function ($q, $status) {
            $q->where('order_status', $status);
        });

        // 4. Payment Status Filter
        $query->when($request->payment_status, function ($q, $status) {
            $q->where('payment_status', $status);
        });

        // 5. Date Filtering
        $query->when($request->date_filter, function ($q, $filter) use ($request) {
            switch ($filter) {
                case 'today':
                    $q->whereDate('created_at', today());
                    break;
                case 'week':
                    $q->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]);
                    break;
                case 'month':
                    $q->whereMonth('created_at', now()->month)
                        ->whereYear('created_at', now()->year);
                    break;
                case 'custom':
                    if ($request->filled(['start_date', 'end_date'])) {
                        $q->whereBetween('created_at', [
                            $request->start_date . ' 00:00:00',
                            $request->end_date . ' 23:59:59'
                        ]);
                    }
                    break;
            }
        });

        // 6. Role Based Access Control
        if (Auth::user()->role === 'employee') {
            $query->where('assigned_to', Auth::id());
        }

        // 7. Sorting
        $allowedSortFields = ['created_at', 'grand_total', 'order_status', 'payment_status', 'id'];
        $sortBy = in_array($request->sort_by, $allowedSortFields) ? $request->sort_by : 'created_at';
        $sortOrder = $request->sort_order === 'asc' ? 'asc' : 'desc';

        $query->orderBy($sortBy, $sortOrder);

        // 8. Execute Query
        $orders = $query->paginate(10)->withQueryString();

        // --- DATA FOR DROPDOWNS / MODALS ---

        // Get employees for assignment dropdown (excluding current user if needed)
        $employees = User::whereIn('role', ['employee', 'admin'])
            ->where('id', '!=', Auth::id())
            ->select('id', 'name')
            ->get();

        // Count pending unassigned orders
        $unassignedCount = Order::where('order_status', 'pending')
            ->whereNull('assigned_to')
            ->count();

        return Inertia::render("Admin/Order/Orders", [
            'orders' => $orders,
            'filters' => $request->only([
                'search',
                'order_status',
                'payment_status',
                'date_filter',
                'start_date',
                'end_date',
                'sort_by',
                'sort_order'
            ]),
            'employees' => $employees,
            'unassignedCount' => $unassignedCount,
        ]);
    }

    // public function viewOrderTable(Request $request)
    // {
    //     // 1. Eager load 'assignee' and 'authorizer' to show names in the table
    //     $query = Order::query()->with(['user', 'assignee', 'authorizer']);

    //     // Search functionality
    //     if ($request->filled('search')) {
    //         $search = $request->search;
    //         $query->where(function ($q) use ($search) {
    //             $q->where('name', 'like', "%{$search}%")
    //                 ->orWhere('email', 'like', "%{$search}%")
    //                 ->orWhere('phone', 'like', "%{$search}%")
    //                 ->orWhere('id', 'like', "%{$search}%");
    //         });
    //     }

    //     // Filter by order status
    //     if ($request->filled('order_status')) {
    //         $query->where('order_status', $request->order_status);
    //     }

    //     // Filter by payment status
    //     if ($request->filled('payment_status')) {
    //         $query->where('payment_status', $request->payment_status);
    //     }

    //     // Date filtering
    //     if ($request->filled('date_filter')) {
    //         $dateFilter = $request->date_filter;

    //         switch ($dateFilter) {
    //             case 'today':
    //                 $query->whereDate('created_at', today());
    //                 break;
    //             case 'week':
    //                 $query->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]);
    //                 break;
    //             case 'month':
    //                 $query->whereMonth('created_at', now()->month)
    //                     ->whereYear('created_at', now()->year);
    //                 break;
    //             case 'custom':
    //                 if ($request->filled('start_date') && $request->filled('end_date')) {
    //                     $query->whereBetween('created_at', [
    //                         $request->start_date . ' 00:00:00',
    //                         $request->end_date . ' 23:59:59'
    //                     ]);
    //                 }
    //                 break;
    //         }
    //     }

    //     // Sorting
    //     $sortBy = $request->get('sort_by', 'created_at');
    //     $sortOrder = $request->get('sort_order', 'desc');

    //     $allowedSortFields = ['created_at', 'grand_total', 'order_status', 'payment_status', 'id'];
    //     if (in_array($sortBy, $allowedSortFields)) {
    //         $query->orderBy($sortBy, $sortOrder);
    //     }

    //     // --- NEW FEATURE: ROLE BASED VIEW ---
    //     // If User is Employee -> Show ONLY orders assigned to them
    //     // If User is Admin -> Show ALL orders
    //     if (Auth::user()->role === 'employee') {
    //         $query->where('assigned_to', Auth::id());
    //     }

    //     $orders = $query->paginate(10)->withQueryString();

    //     // --- NEW FEATURE: DATA FOR BATCH ASSIGNMENT POPUP ---
    //     // 1. Get list of employees to populate the dropdown
    //     $employees = User::whereIn('role', ['employee', 'admin'])
    //         ->where('id', '!=', Auth::id()) // Optional: Exclude current user?
    //         ->select('id', 'name')
    //         ->get();

    //     // 2. Count how many "Pending" orders have NO one assigned
    //     $unassignedCount = Order::where('order_status', 'pending')
    //         ->whereNull('assigned_to')
    //         ->count();

    //     return inertia("Admin/Order/Orders", [
    //         'orders' => $orders,
    //         'filters' => $request->only(['search', 'order_status', 'payment_status', 'date_filter', 'start_date', 'end_date', 'sort_by', 'sort_order']),
    //         // Pass new data to React
    //         'employees' => $employees,
    //         'unassignedCount' => $unassignedCount,
    //     ]);
    // }

    /**
     * --- NEW FEATURE: BATCH ASSIGN METHOD ---
     * This handles the popup form submission to assign N orders to an Employee.
     */
    public function assignBatch(Request $request)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
            'employee_id' => 'required|exists:users,id',
        ]);

        // Logic: Find the IDs of the OLDEST pending orders that have NO owner
        $orderIds = Order::where('order_status', 'pending')
            ->whereNull('assigned_to')
            ->oldest() // Sort by created_at ASC (Oldest first)
            ->take($request->quantity)
            ->pluck('id');

        if ($orderIds->isEmpty()) {
            return redirect()->back()->with('error', 'No pending unassigned orders found.');
        }

        // Update the found orders
        Order::whereIn('id', $orderIds)->update([
            'assigned_to' => $request->employee_id
        ]);

        $assignedCount = $orderIds->count();
        $employeeName = User::find($request->employee_id)->name;

        return redirect()->back()->with('success', "Successfully assigned {$assignedCount} orders to {$employeeName}.");
    }

    public function showDetails($id)
    {
        // Added assignee and authorizer relationships here too just in case you need them in details
        $order = Order::with(['items.product', 'user', 'assignee', 'authorizer'])->findOrFail($id);

        return inertia("Admin/Order/OrderDetails", [
            'order' => $order
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'order_status' => 'required|in:pending,processing,shipped,delivered,cancelled',
            'payment_status' => 'required|in:paid,pending,failed,refunded'
        ]);

        $order = Order::findOrFail($id);

        $data = [
            'order_status' => $request->order_status,
            'payment_status' => $request->payment_status
        ];

        // --- NEW FEATURE: AUTHORIZATION TRACKING ---
        // If the order is being moved to 'processing' or 'shipped' (confirmed states)
        // AND it hasn't been authorized yet, record who did it.
        if (in_array($request->order_status, ['processing', 'shipped', 'delivered'])) {
            if ($order->authorized_by === null) {
                $data['authorized_by'] = Auth::id();
            }
        }

        $order->update($data);

        return redirect()->back()->with('success', 'Order status updated successfully!');
    }

    public function exportPdf(Request $request)
    {
        // Updated to include assignee/authorizer in PDF data if needed
        $query = Order::query()->with(['user', 'assignee', 'authorizer']);

        // Role restriction for PDF export as well (optional, but good for security)
        if (Auth::user()->role === 'employee') {
            $query->where('assigned_to', Auth::id());
        }

        // Apply same filters as the table view
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('id', 'like', "%{$search}%");
            });
        }

        if ($request->filled('order_status')) {
            $query->where('order_status', $request->order_status);
        }

        if ($request->filled('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }

        if ($request->filled('date_filter')) {
            $dateFilter = $request->date_filter;

            switch ($dateFilter) {
                case 'today':
                    $query->whereDate('created_at', today());
                    break;
                case 'week':
                    $query->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]);
                    break;
                case 'month':
                    $query->whereMonth('created_at', now()->month)
                        ->whereYear('created_at', now()->year);
                    break;
                case 'custom':
                    if ($request->filled('start_date') && $request->filled('end_date')) {
                        $query->whereBetween('created_at', [
                            $request->start_date . ' 00:00:00',
                            $request->end_date . ' 23:59:59'
                        ]);
                    }
                    break;
            }
        }

        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');

        $allowedSortFields = ['created_at', 'grand_total', 'order_status', 'payment_status', 'id'];
        if (in_array($sortBy, $allowedSortFields)) {
            $query->orderBy($sortBy, $sortOrder);
        }

        $orders = $query->get();

        $pdf = Pdf::loadView('pdf.orders', ['orders' => $orders]);
        $pdf->setPaper('a4', 'landscape');
        return $pdf->download('orders-' . now()->format('Y-m-d') . '.pdf');
    }

    public function printInvoice($id)
    {
        $order = Order::with(['items.product', 'user'])->findOrFail($id);

        $pdf = Pdf::loadView('pdf.invoice', ['order' => $order]);
        $pdf->setPaper('a4', 'portrait');

        return $pdf->download('invoice-' . $order->id . '.pdf');
    }

    public function viewCustomerDetails($id)
    {
        $user = User::find($id);
        if (!$user) {
            return redirect()->back()->with('error', 'User not found.');
        }
        return inertia("Admin/CustomerDetails", [
            'user' => $user
        ]);
    }
}
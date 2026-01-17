<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Inertia\Inertia;

class StripeController extends Controller
{
    public function checkout(Request $request)
    {
        // 1. Set your Secret Key
        Stripe::setApiKey(env('STRIPE_SECRET'));

        // 2. Create the Checkout Session
        // Ideally, fetch product details from DB using $request->product_id
        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'usd', // or 'bdt' for Bangladesh
                        'product_data' => [
                            'name' => 'Semester Course Book', // Dynamic Name
                        ],
                        'unit_amount' => 5000, // Amount in CENTS (5000 = $50.00)
                    ],
                    'quantity' => 1,
                ]
            ],
            'mode' => 'payment', // 'payment' for one-time, 'subscription' for recurring
            'success_url' => route('payment.success') . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('payment.cancel'),
        ]);

        // 3. Return the session URL to the frontend
        return response()->json(['url' => $session->url]);
    }

    public function success(Request $request)
    {
        // Verify the payment if needed using the session_id
        // Update database order status to 'paid'

        return Inertia::render('Payment/Success', [
            'message' => 'Payment successful! Thank you for your purchase.'
        ]);
    }

    public function cancel()
    {
        return Inertia::render('Payment/Cancel', [
            'message' => 'Payment cancelled. Try again.'
        ]);
    }
}
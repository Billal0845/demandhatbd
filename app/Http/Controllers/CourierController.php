<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CourierController extends Controller
{
    public function sendToSteadfast(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $request->validate([
            'note' => 'nullable|string|max:500',
            'invoice' => 'required|string|max:50|unique:orders,courier_invoice_id,' . $order->id,
        ]);


        try {
            $response = Http::withHeaders([
                'Api-Key' => env('STEADFAST_API_KEY'),
                'Secret-Key' => env('STEADFAST_SECRET_KEY'),
                'Content-Type' => 'application/json',
            ])->post('https://portal.packzy.com/api/v1/create_order', [
                        'invoice' => $request->invoice, // Using the custom invoice from user
                        'recipient_name' => $order->name,
                        'recipient_phone' => $order->phone,
                        'recipient_address' => $order->address,
                        'cod_amount' => $order->grand_total,
                        'note' => $request->note ?? '',
                    ]);

            $result = $response->json();


            if ($response->successful() && isset($result['status']) && $result['status'] == 200) {
                $order->update([
                    'order_status' => 'shipped',
                    'courier_invoice_id' => $request->invoice, // Store the custom ID
                ]);

                return redirect()->back()->with('success', 'Order sent to Steadfast successfully!');
            }

            return redirect()->back()->with('error', 'Steadfast Error: ' . ($result['message'] ?? 'Error occurred.'));

        } catch (\Exception $e) {
            Log::error('Steadfast API Error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to connect to Steadfast.');
        }
    }



    /**
     * Send order data to Steadfast Courier API (v1)
     */
    // public function sendToSteadfast(Request $request, $id)
    // {
    //     $order = Order::findOrFail($id);
    //     dd($request->all());

    //     $request->validate([
    //         'note' => 'nullable|string|max:500'
    //     ]);

    //     try {
    //         // Mapping data from your Order model to Steadfast API (based on PDF Page 2)
    //         $response = Http::withHeaders([
    //             'Api-Key' => env('STEADFAST_API_KEY'),
    //             'Secret-Key' => env('STEADFAST_SECRET_KEY'),
    //             'Content-Type' => 'application/json',
    //         ])->post('https://portal.packzy.com/api/v1/create_order', [
    //                     'invoice' => (string) $order->id,
    //                     'recipient_name' => $order->name,
    //                     'recipient_phone' => $order->phone,
    //                     'recipient_address' => $order->address,
    //                     'cod_amount' => $order->grand_total,
    //                     'note' => $request->note ?? '',
    //                 ]);

    //         $result = $response->json();

    //         // Status 200 means success in Steadfast Documentation
    //         if ($response->successful() && isset($result['status']) && $result['status'] == 200) {

    //             $order->update([
    //                 'order_status' => 'shipped',
    //             ]);

    //             return redirect()->back()->with('success', 'Order sent to Steadfast successfully!');
    //         }

    //         return redirect()->back()->with('error', 'Steadfast Error: ' . ($result['message'] ?? 'Check your API configuration.'));

    //     } catch (\Exception $e) {
    //         Log::error('Steadfast API Error: ' . $e->getMessage());
    //         return redirect()->back()->with('error', 'Failed to connect to Steadfast Courier.');
    //     }
    // }

    /**
     * Placeholder for Takeway integration
     */
    /*
    public function sendToTakeway(Request $request, $id)
    {
        // Logic for Takeway will go here
    }
    */
}
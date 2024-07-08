<?php

namespace App\Http\Controllers;

use App\Models\TransactionAccount;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Transanctions/Index',[
            'transactions' => TransactionAccount::where('company_id', auth()->user()->company_id)->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'=> 'required|max:255',
 
        ]);

        $request->name;
        $validated['name'];

         $transanction = TransactionAccount::where('company_id', auth()->user()->company_id)
                                              ->where('name', $validated['name'])->first();

         if ($transanction) {
            return redirect()->back()->with('error', 'Transaction account already exists');
         }

         $validated['company_id'] = auth()->user()->company_id;
 
         TransactionAccount::create($validated);
 
         return redirect()->back()->with('success', 'Transaction account created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TransactionAccount $transaction)
    {
        $transaction->delete();
    }
}

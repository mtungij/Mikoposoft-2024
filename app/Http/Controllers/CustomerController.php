<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $customers = Customer::with('branch')->where('company_id', auth()->user()->company_id)->get();
        //      if(request()->search) {
        //     $customers = Customer::where('company_id', auth()->user()->company_id)->where('name', 'like', '%'. request()->search. '%')->get();
        // }

        $branchId = auth()->user()->company_id;

         return Inertia::render("Customers/Index",[
            "customers"=> Customer::whereRelation('branch', 'company_id', auth()->user()->company_id)->with('branch')->get(),
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
        //
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
    public function destroy(Customer $customer)
    {
        $customer->delete();
        return redirect()->route("customers.index");
    }
}

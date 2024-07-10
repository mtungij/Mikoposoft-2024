<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::whereRelation('branch', 'company_id', auth()->user()->company_id)->with('branch')->get();
        if(request()->search) {
            $customers = Customer::whereRelation('branch', 'company_id', auth()->user()->company_id)->with('branch')->where('name', 'like', '%'. request()->search. '%')->get();
        }

         return Inertia::render("Customers/Index",[
            "customers"=> $customers,
         ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $customers_count = Customer::whereRelation('branch', 'company_id', auth()->user()->company_id)->count();
        return Inertia::render("Customers/Create", [
            'branches' => Branch::where('company_id', auth()->user()->company_id)->get(),
            'employees' => User::where('company_id', auth()->user()->company_id)->get(),
            'c_number' => 'C-'. date('Ym') . auth()->id() . "-". str_pad($customers_count + 1, 5, 0, STR_PAD_LEFT),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $validatedData = request()->validate([
            'c_number' =>'required',
            'branch_id'=> 'required',
            'user_id'=> 'required',
            'first_name' =>'required',
            'middle_name'=> 'required',
            'last_name'=> 'required',
            'gender'=> 'required',
            'phone'=> 'required|string|max:12|min:12',
            'ward'=> 'nullable',
            'street'=> 'nullable',
            'id_type'=> 'required',
            'id_number'=> 'required',
            'nick_name'=> 'nullable',
            'marital_status'=> 'required',
            'working_status'=> 'required',
            'business_type'=> 'nullable',
            'business_location'=> 'required',
            'monthly_income'=> 'required',
            'img_url'=> 'nullable',
          ]);
  
          $validatedData['company_id'] = auth()->user()->company_id;
  
          Customer::create($validatedData);
             
          return redirect()->back();
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
        $validatedData = request()->validate([
            'c_number' =>'required',
            'branch_id'=> 'required',
            'user_id'=> 'required',
            'first_name' =>'required',
            'middle_name'=> 'required',
            'last_name'=> 'required',
            'gender'=> 'required',
            'phone'=> 'required',
            'ward'=> 'nullable',
            'street'=> 'nullable',
            'id_type'=> 'required',
            'id_number'=> 'required',
            'nick_name'=> 'nullable',
            'marital_status'=> 'required',
            'working_status'=> 'required',
            'business_type'=> 'required',
            'business_location'=> 'required',
            'monthly_income'=> 'required',
            'account_type'=> 'required',
            'img_url'=> 'nullable',
          ]);
  
          Customer::update($validatedData);
             
          return redirect()->back();
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

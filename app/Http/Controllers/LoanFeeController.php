<?php

namespace App\Http\Controllers;

use App\Models\LoanCategory;
use App\Models\LoanCategoryFee;
use Illuminate\Http\Request;
use App\Models\LoanFee;
use Inertia\Inertia;

class LoanFeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('LoanFee/Index',[
            'loanFees' => LoanFee::where('company_id', auth()->user()->company_id)->oldest()->get(),
            'loanProducts' => LoanCategory::with('loanCategoryFees.loanCategory')->where('company_id', auth()->user()->company_id)->get(),
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
           'category'=> 'required|max:255',
           'fee_type'=> 'nullable',
           'desc'=> 'nullable',
           'fee_amount'=> 'nullable|numeric|max:1000000000',

       ]);

        $validated['company_id'] = auth()->user()->company_id;

        LoanFee::create($validated);

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
    public function edit(string $loanfee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LoanFee $loanFee)
    {
        $validated = $request->validate([
            'category'=> 'required|max:255',
            'fee_type'=> 'nullable',
            'desc'=> 'nullable',
            'fee_amount'=> 'nullable|numeric|max:1000000000',
        ]);

        $loanFee->update($validated);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LoanFee $loanFee)
    {
        $loanFee->delete();
    }
}

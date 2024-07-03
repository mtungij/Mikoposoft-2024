<?php

namespace App\Http\Controllers;

use App\Models\LoanCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LoanCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $loanProducts = LoanCategory::where('company_id', auth()->user()->company_id)->get();

        if(request()->search) {
            $loanProducts = LoanCategory::where('company_id', auth()->user()->company_id)->where('name', 'like', '%'. request()->search. '%')->get();
        }
        return Inertia::render('LoanProduct/Index', [
            'loanProducts' => $loanProducts,
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
            'name' =>'required|max:255',
            'from' =>'required|numeric|max:100000000000',
            'to' =>'required|numeric|max:100000000000',
            'interest' =>'required|numeric|max:100',
            'penalt_type' => 'required',
            'penalt_amount' => 'required|numeric|max:1000000000',
            'fee' => 'nullable|numeric|max:1000000000',
        ]);

        $validated['company_id'] = auth()->user()->company_id;

        LoanCategory::create($validated);

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
    public function update(Request $request, LoanCategory $loanProduct)
    {
        $validated = $request->validate([
            'name' =>'required|max:255',
            'from' =>'required|numeric|max:100000000000',
            'to' =>'required|numeric|max:100000000000|gt:from',
            'interest' =>'required|numeric|max:100',
            'penalt_type' => 'required',
            'penalt_amount' => 'required|numeric|max:1000000000',
            'fee' => 'nullable|numeric|max:1000000000',
        ]);

        $loanProduct->update($validated);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

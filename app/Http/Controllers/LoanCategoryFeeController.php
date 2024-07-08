<?php

namespace App\Http\Controllers;

use App\Models\LoanCategoryFee;
use Illuminate\Http\Request;

class LoanCategoryFeeController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'loan_category_id' => 'required',
            'fee_type' => 'required',
            'fee_amount' => 'required|numeric',
            'desc' => 'required|string|max:255'
        ]);

        LoanCategoryFee::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, LoanCategoryFee $loanCategoryFee)
    {
        $validated = $request->validate([
            'loan_category_id' => 'required',
            'fee_type' => 'required',
            'fee_amount' => 'required|numeric',
            'desc' => 'required|string|max:255'
        ]);

        $loanCategoryFee->update($validated);

        return redirect()->back();
    }

}

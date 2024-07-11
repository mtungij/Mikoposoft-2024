<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanController extends Controller
{
    public function index()
    {
        return Inertia::render('Loans/Index', [
            'customers' => Customer::whereRelation('branch', 'company_id', auth()->user()->company_id)->paginate(10),
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\TransactionAccount;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Employee extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('branch')->where('company_id', auth()->user()->company_id)->get();

        if(request()->search) {
            $users = User::where('company_id', auth()->user()->company_id)->where('name', 'like', '%'. request()->search. '%')->get();
        }
        return Inertia::render('Employees/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Employees/CreateUser', [
            'branches' => Branch::where('company_id', auth()->user()->company_id)->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $validated = $request->validate([
            'name' =>'required|max:255',
            'email' =>'required|email|unique:users,email',
            'phone' => 'required|max:12',
            'branch_id' =>'required',
            'position' =>'required',
            'gender' => 'required',
            'account' => 'required',
            'account_number' =>'nullable',
            'salary' =>'nullable',
            'password' => 'required|min:6|confirmed',
        ]);

        $validated['company_id'] = auth()->user()->company_id;

        User::create($validated);

       return to_route('employees.index');
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
    public function edit(User $employee)
    {
        return Inertia::render('Employees/EditUser', [
            'employee' => $employee,
            'branches' => Branch::where('company_id', auth()->user()->company_id)->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $employee)
    {
        $validated = $request->validate([
            'name' =>'required|max:255',
            'phone' => 'required|max:12',
            'branch_id' =>'required',
            'position' =>'required',
            'gender' => 'required',
            'account' => 'required',
            'account_number' =>'nullable',
            'salary' =>'nullable',
        ]);

        $employee->update($validated);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $employee)
    {
        $employee->delete();
    }
}

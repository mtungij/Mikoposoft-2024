<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Region;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $branches =Branch::with('region')->where('company_id', auth()->user()->company_id)->get();

        if(request()->search) {
            $branches = Branch::where('company_id', auth()->user()->company_id)->where('name', 'like', '%'. request()->search. '%')->get();
        }

        return Inertia::render('Branches/Index', [
            'branches' => $branches,
            'regions' => Region::all(),
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
           'region_id' =>'required',
           'email' =>'required',
           'phone' => 'required|max:12',
        ]);

        $validated['company_id'] = auth()->user()->company_id;

        Branch::created($validated);

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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Formula;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InterestFormularController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Formula/Index', [
            'formulas' =>  Formula::where('company_id', auth()->user()->company_id)->get(),
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
        ]);

        $formula =Formula::where('name', $validated['name'])->first();

        if ($formula) {
            return redirect(status: 422)->back()->with('error', 'Formula already exist');
        } else {

        $validated['company_id'] = auth()->user()->company_id;

        $formula = Formula::create($validated);

        return redirect()->back();

        }

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
    public function update(Request $request, Formula $formular)
    {
        $validated = $request->validate([
            'name' =>'required|max:255',
        ]);

        $formular->update($validated);

        return redirect()->back();



    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Formula $formula)
    {
        $formula->delete();
    }
}

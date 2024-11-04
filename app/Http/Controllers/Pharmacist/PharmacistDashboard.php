<?php

namespace App\Http\Controllers\Pharmacist;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PharmacistDashboard extends Controller
{
    //
    public function index()
    {
        $role = Auth::user()->role;
        return Inertia::render('Pharmacist/Dashboard', [
            'role' => $role,
        ]);
    }
}

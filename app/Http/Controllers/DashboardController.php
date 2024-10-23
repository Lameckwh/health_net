<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $role = Auth::user()->role;
        return Inertia::render('Physician/Dashboard', [
            'role' => $role,
        ]);
    }

}

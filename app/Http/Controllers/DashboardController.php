<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        // Get the authenticated user's role
        $role = Auth::user()->role;

        // Pass the role to the Inertia view
        return Inertia::render('Physician/Dashboard', [
            'role' => $role,
        ]);
    }
}

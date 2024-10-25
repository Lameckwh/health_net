<?php

namespace App\Http\Controllers\Patient;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PatientDashboardController extends Controller
{
    //
    public function index()
    {
        $role = Auth::user()->role;
        return Inertia('Patient/Dashboard', [
            'role' => $role,
        ]);
    }
}

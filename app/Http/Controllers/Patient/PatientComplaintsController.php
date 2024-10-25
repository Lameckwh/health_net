<?php

namespace App\Http\Controllers\Patient;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PatientComplaintsController extends Controller
{
    //
    public function index()
    {
        $role = Auth::user()->role;
        return Inertia('Patient/Complaints', [
            'role' => $role,
        ]);
    }
}

<?php

namespace App\Http\Controllers\Patient;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PatientAppointmentsController extends Controller
{
    //
    public function index()
    {
        $role = Auth::user()->role;
        return Inertia('Patient/Appointments', [
            'role' => $role,
        ]);
    }
}
